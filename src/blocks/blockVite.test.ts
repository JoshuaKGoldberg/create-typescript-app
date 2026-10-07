import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockGitHubActionsCI } from "./blockGitHubActionsCI.ts";
import { blockVite } from "./blockVite.ts";
import { optionsBase } from "./options.fakes.ts";

describe(blockVite, () => {
	test("without addons or options", () => {
		const creation = testBlock(blockVite, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
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
			      "block": "[Block Development Docs]",
			    },
			    {
			      "addons": {
			        "beforeLint": "Note that you'll need to run \`pnpm build\` before \`pnpm lint\` so that lint rules which check the file system can pick up on any built files.",
			      },
			      "block": "[Block ESLint]",
			    },
			    {
			      "addons": {
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
			      "block": "[Block GitHub Actions CI]",
			    },
			    {
			      "addons": {
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
			      "block": "[Block GitHub Issue Templates]",
			    },
			    {
			      "addons": {
			        "ignores": [
			          "/dist",
			        ],
			      },
			      "block": "[Block Gitignore]",
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "vite": "^8.3.0",
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
			      "block": "[Block Package JSON]",
			    },
			    {
			      "addons": {
			        "builders": [
			          {
			            "order": 0,
			            "run": "pnpm build",
			          },
			        ],
			      },
			      "block": "[Block release-it]",
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
				"extends": "./tsconfig.json"
			}
			",
			    "vite.config.ts": "import { defineConfig } from "vite";

			// ssr targets Node.js and keeps dependencies external, rather than bundling them for browsers
			export default defineConfig({
				build: {
					lib: {
						entry: "src/index.ts",
						formats: ["es"],
					},
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

	test("with addons", () => {
		const creation = testBlock(blockVite, {
			addons: {
				runInCI: ["node ./dist/index.mjs"],
			},
			options: optionsBase,
		});

		expect(creation.addons).toContainEqual(
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

			// ssr targets Node.js and keeps dependencies external, rather than bundling them for browsers
			export default defineConfig({
				build: {
					lib: {
						entry: "src/index.ts",
						formats: ["es"],
					},
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
});
