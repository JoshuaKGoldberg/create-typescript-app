import removeUndefinedObjects from "remove-undefined-objects";
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
import { intakeFileDefineConfig } from "./intake/intakeFileDefineConfig.ts";
import { CommandPhase } from "./phases.ts";

const zProperties = z.record(z.string(), z.unknown());

const zBuild = z
	.object({
		rolldownOptions: z
			.object({ output: zProperties.optional() })
			.catchall(z.unknown())
			.optional(),
	})
	.catchall(z.unknown());

function omit(record: Record<string, unknown> | undefined, keys: string[]) {
	return Object.fromEntries(
		Object.entries(record ?? {}).filter(([key]) => !keys.includes(key)),
	);
}

export const blockVite = base.createBlock({
	about: {
		name: "Vite",
	},
	intake({ files }) {
		const rawData = intakeFileDefineConfig(files, ["vite.config.ts"]);
		if (!rawData) {
			return undefined;
		}

		const { build: rawBuild, ...properties } = rawData;
		const { rolldownOptions: rawRolldownOptions, ...build } = omit(
			zProperties.safeParse(rawBuild).data,
			["lib", "ssr"],
		);
		const { output: rawOutput, ...rolldownOptions } =
			zProperties.safeParse(rawRolldownOptions).data ?? {};
		const output = omit(zProperties.safeParse(rawOutput).data, [
			"chunkFileNames",
			"entryFileNames",
			"preserveModules",
			"preserveModulesRoot",
		]);

		return {
			build: removeUndefinedObjects({
				...build,
				rolldownOptions: { ...rolldownOptions, output },
			}),
			properties,
		};
	},
	produce({ options, props }) {
		const { build, properties, runInCI } = props;
		const { rolldownOptions, ...buildRest } = build;
		const { output, ...rolldownRest } = rolldownOptions ?? {};

		return {
			extensions: [
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
								default: "./dist/index.mjs",
								types: "./dist/index.d.ts",
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
						include: ["src"],
					}),
				),
				"vite.config.ts": formatFile(
					"vite.config.ts",
					`import { defineConfig } from "vite";

export default defineConfig(${JSON.stringify({
						build: {
							...buildRest,
							lib: {
								entry: "src/index.ts",
								formats: ["es"],
							},
							rolldownOptions: {
								...rolldownRest,
								output: {
									...output,
									chunkFileNames: "[name]-[hash].mjs",
									entryFileNames: "[name].mjs",
									...(!options.bundle && {
										preserveModules: true,
										preserveModulesRoot: "src",
									}),
								},
							},
							ssr: true,
						},
						...properties,
					})});
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
	props: {
		build: zBuild.default({}),
		properties: zProperties.default({}),
		runInCI: z.array(z.string()).default([]),
	},
});
