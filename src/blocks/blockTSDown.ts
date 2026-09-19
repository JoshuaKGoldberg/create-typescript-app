import removeUndefinedObjects from "remove-undefined-objects";
import { z } from "zod";

import { base } from "../base.ts";
import { getPackageDependencies } from "../data/packageData.ts";
import { blockCSpell } from "./blockCSpell.ts";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.ts";
import { blockESLint } from "./blockESLint.ts";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.ts";
import { blockGitignore } from "./blockGitignore.ts";
import { blockPackageJson } from "./blockPackageJson.ts";
import { blockPrettier } from "./blockPrettier.ts";
import { blockReleaseIt } from "./blockReleaseIt.ts";
import { blockRemoveDependencies } from "./blockRemoveDependencies.ts";
import { blockRemoveFiles } from "./blockRemoveFiles.ts";
import { blockRemoveWorkflows } from "./blockRemoveWorkflows.ts";
import { blockVitest } from "./blockVitest.ts";
import { intakeFileDefineConfig } from "./intake/intakeFileDefineConfig.ts";
import { CommandPhase } from "./phases.ts";

const zEntry = z.array(z.string());
const zProperties = z.record(z.unknown());

// Test files are excluded from builds so that they don't end up in published output.
// This lives here rather than as a blockVitest addon because blockVitest receiving
// outDir from blockTSDown while also sending entries back would create an addons
// cycle that bingo-stratum never settles.
const defaultEntry = ["src/**/*.ts", "!src/**/*.test.*"];

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
			entry: zEntry.safeParse(rawEntry).data,
			properties: removeUndefinedObjects({
				...zProperties.safeParse(rest).data,

				// In case of a tsup.config.ts migrated to tsdown.config.ts
				bundle: undefined,
				clean: rest.clean === false ? false : undefined,
				format: rest.format === "esm" ? undefined : rest.format,
			}),
		};
	},
	produce({ addons, options }) {
		const { entry, properties, runInCI } = addons;

		// tsdown defaults to building into dist/, so it's not written to the config.
		// Existing repositories that explicitly wrote an outDir keep using it.
		const outDir =
			typeof properties.outDir === "string" ? properties.outDir : "dist";

		return {
			addons: [
				blockCSpell({
					ignorePaths: [outDir],
				}),
				blockDevelopmentDocs({
					sections: {
						Building: {
							contents: `
Run [**tsdown**](https://tsdown.dev) locally to build source files from \`src/\` into output files in \`${outDir}/\`:

\`\`\`shell
pnpm build
\`\`\`

Add \`--watch\` to run the builder in a watch mode that continuously cleans and recreates \`${outDir}/\` as you save files:

\`\`\`shell
pnpm build --watch
\`\`\`
`,
						},
					},
				}),
				blockESLint({
					beforeLint: `Note that you'll need to run \`pnpm build\` before \`pnpm lint\` so that lint rules which check the file system can pick up on any built files.`,
					ignores: [outDir],
				}),
				blockGitignore({
					ignores: [`/${outDir}`],
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
						files: [`${outDir}/`],
						scripts: {
							build: "tsdown",
						},
					},
				}),
				blockPrettier({
					ignores: [`/${outDir}`],
				}),
				blockReleaseIt({
					builders: [
						{
							order: 0,
							run: "pnpm build",
						},
					],
				}),
				blockVitest({
					exclude: [outDir],
				}),
			],
			files: {
				"tsdown.config.ts": `import { defineConfig } from "tsdown";

export default defineConfig(${JSON.stringify({
					entry: Array.from(new Set([...defaultEntry, ...entry])),
					unbundle: true,
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
