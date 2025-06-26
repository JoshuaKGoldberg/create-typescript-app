import removeUndefinedObjects from "remove-undefined-objects";
import { z } from "zod";

import { base } from "../base.js";
import { getPackageDependencies } from "../data/packageData.js";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.js";
import { blockESLint } from "./blockESLint.js";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.js";
import { blockKnip } from "./blockKnip.js";
import { blockPackageJson } from "./blockPackageJson.js";
import { blockReleaseIt } from "./blockReleaseIt.js";
import { blockRemoveDependencies } from "./blockRemoveDependencies.js";
import { blockRemoveFiles } from "./blockRemoveFiles.js";
import { blockRemoveWorkflows } from "./blockRemoveWorkflows.js";
import { intakeFileDefineConfig } from "./intake/intakeFileDefineConfig.js";
import { CommandPhase } from "./phases.js";

const zEntry = z.array(z.string());
const zProperties = z.record(z.unknown());

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

		return {
			addons: [
				blockDevelopmentDocs({
					sections: {
						Building: {
							contents: `
Run [**tsdown**](https://tsdown.dev) locally to build source files from \`src/\` into output files in \`lib/\`:

\`\`\`shell
pnpm build
\`\`\`

Add \`--watch\` to run the builder in a watch mode that continuously cleans and recreates \`lib/\` as you save files:

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
				blockKnip({
					entry: ["src/index.ts"],
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
					dts: true,
					entry: Array.from(new Set(["src/**/*.ts", ...entry])),
					outDir: "lib",
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
