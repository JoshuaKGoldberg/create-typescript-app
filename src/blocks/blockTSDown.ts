import { IntakeDirectory } from "bingo-fs";
import removeUndefinedObjects from "remove-undefined-objects";
import { z } from "zod";

import { base } from "../base.ts";
import { getPackageDependencies } from "../data/packageData.ts";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.ts";
import { blockESLint } from "./blockESLint.ts";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.ts";
import { blockPackageJson } from "./blockPackageJson.ts";
import { blockReleaseIt } from "./blockReleaseIt.ts";
import { blockRemoveDependencies } from "./blockRemoveDependencies.ts";
import { blockRemoveFiles } from "./blockRemoveFiles.ts";
import { blockRemoveWorkflows } from "./blockRemoveWorkflows.ts";
import { intakeFileAsJson } from "./intake/intakeFileAsJson.ts";
import { intakeFileDefineConfig } from "./intake/intakeFileDefineConfig.ts";
import { CommandPhase } from "./phases.ts";

const zEntry = z.array(z.string());
const zProperties = z.record(z.string(), z.unknown());

// Whichever of these is the base entry is re-added in produce based on options.bundle
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
	addons: {
		entry: zEntry.default([]),
		properties: zProperties.default({}),
		runInCI: z.array(z.string()).default([]),
	},
	intake({ files }) {
		const rawData =
			intakeFileDefineConfig(files, ["tsdown.config.ts"]) ??
			intakeFileDefineConfig(files, ["tsup.config.ts"]);
		if (!rawData) {
			return undefined;
		}

		const { entry: rawEntry, ...rest } = rawData;

		return {
			entry: zEntry
				.safeParse(rawEntry)
				.data?.filter((entry) => !defaultEntries.has(entry)),
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

				// Owned by the base bundle option, which is read from this file
				unbundle: undefined,
			}),
		};
	},
	produce({ addons, options }) {
		const { entry, properties, runInCI } = addons;

		return {
			addons: [
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
				blockPackageJson({
					properties: {
						devDependencies: getPackageDependencies("tsdown"),
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
				"tsdown.config.ts": `import { defineConfig } from "tsdown";

export default defineConfig(${JSON.stringify({
					entry: Array.from(
						new Set([
							options.bundle ? "src/index.ts" : "src/**/*.ts",
							...entry,
						]),
					),
					...(options.bundle ? {} : { unbundle: true }),
					...properties,
				})});
`,
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
	transition() {
		return {
			addons: [
				blockRemoveDependencies({
					dependencies: [
						"@babel/cli",
						"@babel/core",
						"@babel/preset-typescript",
						"babel",
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
			],
		};
	},
});
