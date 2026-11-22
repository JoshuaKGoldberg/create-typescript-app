import { testBlock, testIntake } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockGitHubActionsCI } from "./blockGitHubActionsCI.ts";
import { blockVite } from "./blockVite.ts";
import { optionsBase } from "./options.fakes.ts";

describe(blockVite, () => {
	test("without props or options", () => {
		const creation = testBlock(blockVite, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block Development Docs]",
			      "props": {
			        "sections": {
			          "Building": {
			            "contents": "
			Run [Vite](https://vite.dev) in [library mode](https://vite.dev/guide/build#library-mode) locally to build source files from \`src/\` into output files in \`dist/\`, then [TypeScript](https://typescriptlang.org) to add \`.d.ts\` declaration files alongside them:

			\`\`\`shell
			pnpm build
			\`\`\`
			",
			          },
			        },
			      },
			    },
			    {
			      "block": "[Block ESLint]",
			      "props": {
			        "beforeLint": "Note that you'll need to run \`pnpm build\` before \`pnpm lint\` so that lint rules which check the file system can pick up on any built files.",
			      },
			    },
			    {
			      "block": "[Block GitHub Actions CI]",
			      "props": {
			        "jobs": [
			          {
			            "name": "Build",
			            "steps": [
			              {
			                "run": "pnpm build",
			              },
			            ],
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block GitHub Issue Templates]",
			      "props": {
			        "checklists": {
			          "bug": [
			            "I have pulled in the newest version of the project.",
			            "I have tried restarting my IDE and the issue persists.",
			          ],
			          "feature": [
			            "I have looked at the latest version of the project.",
			          ],
			        },
			      },
			    },
			    {
			      "block": "[Block Gitignore]",
			      "props": {
			        "ignores": [
			          "/dist",
			        ],
			      },
			    },
			    {
			      "block": "[Block Package JSON]",
			      "props": {
			        "properties": {
			          "devDependencies": {
			            "vite": "8.3.0",
			          },
			          "exports": {
			            ".": {
			              "default": "./dist/index.mjs",
			              "types": "./dist/index.d.ts",
			            },
			          },
			          "files": [
			            "dist/",
			          ],
			          "scripts": {
			            "build": "vite build && tsc --project tsconfig.declarations.json",
			          },
			        },
			      },
			    },
			    {
			      "block": "[Block release-it]",
			      "props": {
			        "builders": [
			          {
			            "order": 0,
			            "run": "pnpm build",
			          },
			        ],
			      },
			    },
			  ],
			  "files": {
			    "tsconfig.declarations.json": "{
				"compilerOptions": {
					"declaration": true,
					"emitDeclarationOnly": true,
					"noEmit": false,
					"outDir": "dist",
					"rootDir": "src"
				},
				"exclude": ["src/**/*.test.*"],
				"extends": "./tsconfig.json",
				"include": ["src"]
			}
			",
			    "vite.config.ts": "import { defineConfig } from "vite";

			export default defineConfig({
				build: {
					lib: { entry: "src/index.ts", formats: ["es"] },
					rolldownOptions: {
						output: {
							chunkFileNames: "[name]-[hash].mjs",
							entryFileNames: "[name].mjs",
							preserveModules: true,
							preserveModulesRoot: "src",
						},
					},
					ssr: true,
				},
			});
			",
			  },
			  "scripts": undefined,
			}
		`);
	});

	test("with props", () => {
		const creation = testBlock(blockVite, {
			options: optionsBase,
			props: {
				runInCI: ["node ./dist/index.mjs"],
			},
		});

		expect(creation.extensions).toContainEqual(
			blockGitHubActionsCI({
				jobs: [
					{
						name: "Build",
						steps: [{ run: "pnpm build" }, { run: "node ./dist/index.mjs" }],
					},
				],
			}),
		);
	});

	test("with the bin option", () => {
		const creation = testBlock(blockVite, {
			options: { ...optionsBase, bin: "bin/index.js" },
		});

		expect(creation.scripts).toMatchInlineSnapshot(`
			[
			  {
			    "commands": [
			      "pnpm build",
			    ],
			    "phase": 2,
			  },
			]
		`);
	});

	test("with the bundle option", () => {
		const creation = testBlock(blockVite, {
			options: { ...optionsBase, bundle: true },
		});

		expect(creation.files?.["vite.config.ts"]).toMatchInlineSnapshot(`
			"import { defineConfig } from "vite";

			export default defineConfig({
				build: {
					lib: { entry: "src/index.ts", formats: ["es"] },
					rolldownOptions: {
						output: {
							chunkFileNames: "[name]-[hash].mjs",
							entryFileNames: "[name].mjs",
						},
					},
					ssr: true,
				},
			});
			"
		`);
	});

	describe("intake", () => {
		test("returns undefined when vite.config.ts does not exist", () => {
			expect(testIntake(blockVite, { files: {} })).toBeUndefined();
		});

		test("returns undefined when vite.config.ts does not contain data", () => {
			const actual = testIntake(blockVite, {
				files: { "vite.config.ts": ["..."] },
			});

			expect(actual).toBeUndefined();
		});

		test("returns properties and build settings that the block does not own", () => {
			const actual = testIntake(blockVite, {
				files: {
					"vite.config.ts": [
						`defineConfig(${JSON.stringify({
							build: {
								lib: { entry: "src/other.ts" },
								minify: false,
								rolldownOptions: {
									external: ["fs"],
									output: { banner: "// hi", preserveModules: true },
								},
								ssr: true,
							},
							resolve: { alias: { a: "b" } },
						})})`,
					],
				},
			});

			expect(actual).toEqual({
				build: {
					minify: false,
					rolldownOptions: {
						external: ["fs"],
						output: { banner: "// hi" },
					},
				},
				properties: { resolve: { alias: { a: "b" } } },
			});
		});

		test("returns only properties when vite.config.ts has no build settings", () => {
			const actual = testIntake(blockVite, {
				files: {
					"vite.config.ts": [
						`defineConfig(${JSON.stringify({ resolve: { alias: { a: "b" } } })})`,
					],
				},
			});

			expect(actual).toEqual({
				build: undefined,
				properties: { resolve: { alias: { a: "b" } } },
			});
		});

		test("carries existing settings into vite.config.ts", () => {
			const creation = testBlock(blockVite, {
				options: { ...optionsBase, bundle: true },
				props: {
					build: {
						minify: false,
						rolldownOptions: {
							external: ["fs"],
							output: { banner: "// hi" },
						},
					},
					properties: { resolve: { alias: { a: "b" } } },
				},
			});

			expect(creation.files?.["vite.config.ts"]).toMatchInlineSnapshot(`
				"import { defineConfig } from "vite";

				export default defineConfig({
					build: {
						minify: false,
						lib: { entry: "src/index.ts", formats: ["es"] },
						rolldownOptions: {
							external: ["fs"],
							output: {
								banner: "// hi",
								chunkFileNames: "[name]-[hash].mjs",
								entryFileNames: "[name].mjs",
							},
						},
						ssr: true,
					},
					resolve: { alias: { a: "b" } },
				});
				"
			`);
		});
	});
});
