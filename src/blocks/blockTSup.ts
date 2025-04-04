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
import { CommandPhase } from "./phases.js";

export const blockTSup = base.createBlock({
	about: {
		name: "TSup",
	},
	addons: {
		entry: z.array(z.string()).default([]),
		properties: z.record(z.unknown()).default({}),
		runInCI: z.array(z.string()).default([]),
	},
	produce({ addons, options }) {
		const { entry, properties, runInCI } = addons;

		return {
			addons: [
				blockDevelopmentDocs({
					sections: {
						Building: {
							contents: `
Run [**tsup**](https://tsup.egoist.dev) locally to build source files from \`src/\` into output files in \`lib/\`:

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
						devDependencies: getPackageDependencies("tsup"),
						scripts: {
							build: "tsup",
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
				"tsup.config.ts": `import { defineConfig } from "tsup";

export default defineConfig(${JSON.stringify({
					bundle: false,
					clean: true,
					dts: true,
					entry: ["src/**/*.ts", ...entry],
					format: "esm",
					outDir: "lib",
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
					files: [".babelrc*", "babel.config.*", "dist", "lib"],
				}),
				blockRemoveWorkflows({
					workflows: ["build", "tsup"],
				}),
			],
		};
	},
});
