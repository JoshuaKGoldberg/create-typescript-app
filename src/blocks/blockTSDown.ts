import { IntakeDirectory } from "bingo-fs";
import removeUndefinedObjects from "remove-undefined-objects";
import sortKeys from "sort-keys";
import { z } from "zod";

import { base } from "../base.ts";
import { getPackageDependencies } from "../data/packageData.ts";
import { formatFile } from "../utils/formatFile.ts";
import { blockCSpell } from "./blockCSpell.ts";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.ts";
import { blockESLint } from "./blockESLint.ts";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.ts";
import { blockGitHubIssueTemplates } from "./blockGitHubIssueTemplates.ts";
import { blockGitignore } from "./blockGitignore.ts";
import { blockPackageJson } from "./blockPackageJson.ts";
import { blockReleaseIt } from "./blockReleaseIt.ts";
import { blockRemoveDependencies } from "./blockRemoveDependencies.ts";
import { blockRemoveFiles } from "./blockRemoveFiles.ts";
import { blockRemoveWorkflows } from "./blockRemoveWorkflows.ts";
import { blockVitest } from "./blockVitest.ts";
import { withPreviously } from "./files/withPreviously.ts";
import { intakeFileAsJson } from "./intake/intakeFileAsJson.ts";
import { intakeFileDefineConfig } from "./intake/intakeFileDefineConfig.ts";
import { intakeReferencedEntries } from "./intake/intakeReferencedEntries.ts";
import { CommandPhase } from "./phases.ts";

const zEntry = z.array(z.string());
const zProperties = z.record(z.string(), z.unknown());

// The base entry is re-added in produce; src/**/*.ts was the unbundled default
const defaultEntries = new Set(["src/**/*.ts", "src/index.ts"]);

function hasJsEntryPoint(files: IntakeDirectory) {
	const packageData = intakeFileAsJson(files, ["package.json"]);
	const exports = packageData?.exports;
	const entryPoint =
		typeof exports === "string"
			? exports
			: ((exports as Record<string, unknown> | undefined)?.["."] ??
				packageData?.main);

	return typeof entryPoint === "string"
		? entryPoint.endsWith(".js")
		: entryPoint === undefined;
}

function isEsmOnly(format: unknown) {
	return format === undefined || format === "esm";
}

function isLegacyOutDir(outDir: unknown) {
	return (
		typeof outDir === "string" &&
		outDir.replace(/^\.\//u, "").replace(/\/$/u, "") === "lib"
	);
}

export const blockTSDown = base.createBlock({
	about: {
		name: "TSDown",
	},
	intake({ files }) {
		const rawData =
			intakeFileDefineConfig(files, [
				["tsdown.config.ts", "tsdown.config.mts"],
			]) ?? intakeFileDefineConfig(files, ["tsup.config.ts"]);
		if (!rawData) {
			return undefined;
		}

		const { entry: rawEntry, ...rest } = rawData;
		const entries = zEntry.safeParse(rawEntry).data;

		return {
			entry:
				entries &&
				Array.from(
					new Set([
						...entries,
						...(entries.includes("src/**/*.ts")
							? intakeReferencedEntries(files, rest.outDir)
							: []),
					]),
				)
					// Exclusion globs only applied to the old src/**/*.ts default entry
					.filter(
						(entry) => !defaultEntries.has(entry) && !entry.startsWith("!"),
					),
			properties: removeUndefinedObjects({
				...zProperties.safeParse(rest).data,

				// In case of a tsup.config.ts migrated to tsdown.config.ts
				bundle: undefined,
				clean: rest.clean === false ? false : undefined,
				fixedExtension:
					rest.fixedExtension ??
					(isEsmOnly(rest.format) && hasJsEntryPoint(files)
						? false
						: undefined),
				format: rest.format === "esm" ? undefined : rest.format,

				// lib was the default before build output moved to tsdown's dist
				outDir: isLegacyOutDir(rest.outDir) ? undefined : rest.outDir,

				// Published packages shouldn't ship source maps (#1909)
				sourcemap: undefined,

				// Owned by the base bundle option, which is read from this file
				unbundle: undefined,
			}),
		};
	},
	produce({ options, props }) {
		const { entry, exports, main, properties, runInCI } = props;

		const configFileName =
			options.type === "commonjs" ? "tsdown.config.mts" : "tsdown.config.ts";

		return {
			extensions: [
				blockDevelopmentDocs({
					sections: {
						Building: {
							contents: `
Run [**tsdown**](https://tsdown.dev) locally to build source files from \`src/\` into output files in \`dist/\`:

\`\`\`shell
pnpm build
\`\`\`

Add \`--watch\` to run the builder in a watch mode that continuously cleans and recreates \`dist/\` as you save files:

\`\`\`shell
pnpm build --watch
\`\`\`
`,
						},
					},
				}),
				blockESLint({
					beforeLint: `Note that you'll need to run \`pnpm build\` before \`pnpm lint\` so that lint rules which check the file system can pick up on any built files.`,
				}),
				blockGitHubActionsCI({
					jobs: [
						{
							name: "Build",
							steps: [
								{ run: "pnpm build" },
								...runInCI.map((run) => ({ run })),
							],
						},
					],
				}),
				blockGitHubIssueTemplates({
					checklists: {
						bug: [
							"I have pulled in the newest version of the project.",
							"I have tried restarting my IDE and the issue persists.",
						],
						feature: ["I have looked at the latest version of the project."],
					},
				}),
				blockGitignore({
					ignores: ["/dist"],
				}),
				blockPackageJson({
					properties: {
						devDependencies: getPackageDependencies("tsdown"),
						...(exports && { exports: { ".": exports } }),
						files: ["dist/"],
						...(main && { main }),
						scripts: {
							build: "tsdown",
						},
					},
				}),
				blockReleaseIt({
					builders: [
						{
							order: 0,
							run: "pnpm build",
						},
					],
				}),
			],
			files: {
				[configFileName]: withPreviously(
					formatFile(
						configFileName,
						`import { defineConfig } from "tsdown";

export default defineConfig(${JSON.stringify(
							sortKeys({
								// unbundle still only builds modules reachable from entries
								entry: Array.from(new Set(["src/index.ts", ...entry])),
								...(options.bundle ? {} : { unbundle: true }),
								...properties,
							}),
						)});
`,
					),
					options.type === "commonjs"
						? ["tsdown.config.ts", "tsup.config.ts"]
						: ["tsup.config.ts"],
				),
			},
			scripts: options.bin
				? [
						{
							commands: ["pnpm build"],
							phase: CommandPhase.Build,
						},
					]
				: undefined,
		};
	},
	props: {
		entry: zEntry.default([]),
		exports: z.union([z.string(), zProperties]).optional(),
		main: z.string().optional(),
		properties: zProperties.default({}),
		runInCI: z.array(z.string()).default([]),
	},
	transition() {
		return {
			extensions: [
				blockCSpell({
					ignorePathRemovals: ["lib"],
				}),
				blockESLint({
					ignoreRemovals: ["lib"],
				}),
				blockGitignore({
					removals: ["/lib", "dist/", "lib/"],
				}),
				blockPackageJson({
					outdatedFiles: ["lib/"],
				}),
				blockRemoveDependencies({
					dependencies: [
						"@babel/cli",
						"@babel/core",
						"@babel/preset-typescript",
						"babel",
						"tsup",
					],
				}),
				blockRemoveFiles({
					files: [
						".babelrc*",
						"babel.config.*",
						"dist",
						"lib",
						"tsup.config.*",
					],
				}),
				blockRemoveWorkflows({
					workflows: ["build", "tsup"],
				}),
				blockVitest({
					excludeRemovals: ["lib"],
				}),
			],
		};
	},
});
