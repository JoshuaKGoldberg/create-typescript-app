import { z } from "zod";

import { base } from "../base.ts";
import { formatFile } from "../utils/formatFile.ts";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.ts";
import { blockESLint } from "./blockESLint.ts";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.ts";
import { blockGitHubIssueTemplates } from "./blockGitHubIssueTemplates.ts";
import { blockGitignore } from "./blockGitignore.ts";
import { blockPackageJson } from "./blockPackageJson.ts";
import { blockReleaseIt } from "./blockReleaseIt.ts";
import { CommandPhase } from "./phases.ts";

export const blockVite = base.createBlock({
	about: {
		name: "Vite",
	},
	addons: {
		runInCI: z.array(z.string()).default([]),
	},
	produce({ addons, options }) {
		const { runInCI } = addons;

		return {
			addons: [
				blockDevelopmentDocs({
					sections: {
						Building: {
							contents: `
Run [Vite](https://vite.dev) in [library mode](https://vite.dev/guide/build#library-mode) locally to build source files from \`src/\` into output files in \`dist/\`, then [TypeScript](https://typescriptlang.org) to add \`.d.ts\` declaration files alongside them:

\`\`\`shell
pnpm build
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
						devDependencies: {
							vite: "^8.3.0",
						},
						exports: {
							".": {
								types: "./dist/index.d.ts",
								// TypeScript needs types first, and Node.js needs default last
								default: "./dist/index.mjs",
							},
						},
						files: ["dist/"],
						scripts: {
							build: "vite build && tsc --project tsconfig.declarations.json",
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
				// Vite doesn't generate declaration files, so tsc creates them
				"tsconfig.declarations.json": formatFile(
					"tsconfig.declarations.json",
					JSON.stringify({
						compilerOptions: {
							declaration: true,
							emitDeclarationOnly: true,
							noEmit: false,
							outDir: "dist",
							rootDir: "src",
						},
						exclude: ["src/**/*.test.*"],
						extends: "./tsconfig.json",
					}),
				),
				"vite.config.ts": formatFile(
					"vite.config.ts",
					`import { defineConfig } from "vite";

// ssr targets Node.js and keeps dependencies external, rather than bundling them for browsers
export default defineConfig({
	build: {
		lib: {
			entry: "src/index.ts",
			formats: ["es"],
		},
		rolldownOptions: {
			output: ${JSON.stringify({
				chunkFileNames: "[name]-[hash].mjs",
				entryFileNames: "[name].mjs",
				...(!options.bundle && {
					preserveModules: true,
					preserveModulesRoot: "src",
				}),
			})},
		},
		ssr: true,
	},
});
`,
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
});
