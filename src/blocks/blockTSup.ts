import { z } from "zod";

import { base } from "../base.js";
import { getPackageDependencies } from "../data/packageData.js";
import { resolveBin } from "../utils/resolveBin.js";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.js";
import { blockESLint } from "./blockESLint.js";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.js";
import { blockPackageJson } from "./blockPackageJson.js";
import { CommandPhase } from "./phases.js";

export const blockTSup = base.createBlock({
	about: {
		name: "tsup",
	},
	addons: {
		entry: z.array(z.string()).default([]),
		runArgs: z.array(z.string()).default([]),
	},
	migrate() {
		return {
			scripts: [
				{
					commands: [
						`node ${resolveBin("remove-dependencies/bin/index.js")} @babel/core babel`,
					],
					phase: CommandPhase.Process,
				},
				{
					commands: ["rm -rf .babelrc* babel.config.* dist lib"],
					phase: CommandPhase.Migrations,
					silent: true,
				},
			],
		};
	},
	produce({ addons, options }) {
		const { entry } = addons;

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
								{
									run: `node lib/index.js${addons.runArgs.map((arg) => ` ${arg}`).join("")}`,
								},
							],
						},
					],
				}),
				blockPackageJson({
					properties: {
						devDependencies: getPackageDependencies("tsup"),
						scripts: {
							build: "tsup",
						},
					},
				}),
			],
			files: {
				"tsup.config.ts": `import { defineConfig } from "tsup";

export default defineConfig({
	bundle: false,
	clean: true,
	dts: true,
	entry: ${JSON.stringify(["src/**/*.ts", ...entry])},
	format: "esm",
	outDir: "lib",
	sourcemap: true,
});
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
});
