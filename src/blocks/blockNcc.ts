import { z } from "zod";

import { base } from "../base.ts";
import { formatFile } from "../utils/formatFile.ts";
import { blockCSpell } from "./blockCSpell.ts";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.ts";
import { blockESLint } from "./blockESLint.ts";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.ts";
import { blockGitignore } from "./blockGitignore.ts";
import { blockPackageJson } from "./blockPackageJson.ts";
import { blockPrettier } from "./blockPrettier.ts";
import { blockReleaseIt } from "./blockReleaseIt.ts";
import { blockTypeScript } from "./blockTypeScript.ts";
import { blockVitest } from "./blockVitest.ts";

export const blockNcc = base.createBlock({
	about: {
		name: "ncc",
	},
	addons: {
		build: z.string().optional(),
		entry: z.string().optional(),
	},
	intake({ options }) {
		const scripts = options.packageData?.scripts;

		return {
			// Existing tsc builds may use their own settings, such as a tsconfig.build.json
			build: scripts?.build?.match(/^tsc\b/) ? scripts.build : undefined,
			entry: scripts?.["build:release"]?.match(/ncc build (.+) -o dist/)?.[1],
		};
	},
	produce({ addons }) {
		const { build, entry = "src/index.ts" } = addons;

		return {
			addons: [
				blockCSpell({
					ignorePaths: ["dist", "lib"],
				}),
				blockDevelopmentDocs({
					sections: {
						Building: {
							contents: `
Run [TypeScript](https://typescriptlang.org) locally to type check and build source files from \`src/\` into output files in \`lib/\`:

\`\`\`shell
pnpm build
\`\`\`

Add \`--watch\` to run the builder in a watch mode that continuously cleans and recreates \`lib/\` as you save files:

\`\`\`shell
pnpm build --watch
\`\`\`
`,
							innerSections: [
								{
									contents: `
Run [\`@vercel/ncc\`](https://github.com/vercel/ncc) to create an output \`dist/\` to be used in production.

\`\`\`shell
pnpm build:release
\`\`\`
		`,
									heading: "Building for Release",
								},
							],
						},
					},
				}),
				blockESLint({
					ignores: ["dist", "lib"],
				}),
				blockGitHubActionsCI({
					jobs: [
						{
							name: "Build",
							steps: [{ run: "pnpm build" }],
						},
						{
							name: "Build (Release)",
							steps: [{ run: "pnpm build:release" }],
						},
					],
				}),
				blockGitignore({
					ignores: ["/lib"],
				}),
				blockPackageJson({
					properties: {
						devDependencies: {
							"@vercel/ncc": "^0.38.3",
						},
						files: ["lib/"],
						scripts: {
							build: build ?? "tsc --project tsconfig.build.json",
							"build:release": `ncc build ${entry} -o dist`,
						},
					},
				}),
				blockPrettier({
					ignores: ["/dist", "/lib"],
				}),
				blockReleaseIt({
					builders: [
						{
							order: 0,
							run: "pnpm build",
						},
					],
				}),
				blockTypeScript({
					outDir: "lib",
				}),
				blockVitest({
					exclude: ["lib"],
				}),
			],
			...(!build && {
				files: {
					// Test files don't need to be built into the published lib/
					"tsconfig.build.json": formatFile(
						"tsconfig.build.json",
						JSON.stringify({
							exclude: ["src/**/*.test.ts"],
							extends: "./tsconfig.json",
						}),
					),
				},
			}),
		};
	},
	setup() {
		return {
			addons: [
				blockPackageJson({
					properties: {
						// tsc builds the package's entry point into lib/, not ncc's dist/
						exports: { ".": "./lib/index.js" },
					},
				}),
			],
		};
	},
	transition() {
		return {
			addons: [
				// dist/ holds the committed ncc bundle, so it must not be ignored
				blockGitignore({
					removals: ["/dist", "dist", "dist/"],
				}),
			],
		};
	},
});
