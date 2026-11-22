import { testBlock, testIntake } from "bingo-stratum-testers";
import { describe, expect, it, test, vi } from "vitest";

import { blockTSDown } from "./blockTSDown.ts";
import { optionsBase } from "./options.fakes.ts";

vi.mock("../data/packageData.ts", async (importOriginal) => {
	const { getPackageDependencies } =
		await importOriginal<typeof import("../data/packageData.ts")>();
	return {
		getPackageDependencies: (...names: string[]) =>
			Object.fromEntries(
				Object.keys(getPackageDependencies(...names)).map((name) => [
					name,
					"0.0.0-mock",
				]),
			),
	};
});

describe(blockTSDown, () => {
	test("without props or options", () => {
		const creation = testBlock(blockTSDown, {
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
			Run [**tsdown**](https://tsdown.dev) locally to build source files from \`src/\` into output files in \`dist/\`:

			\`\`\`shell
			pnpm build
			\`\`\`

			Add \`--watch\` to run the builder in a watch mode that continuously cleans and recreates \`dist/\` as you save files:

			\`\`\`shell
			pnpm build --watch
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
			            "tsdown": "0.0.0-mock",
			          },
			          "files": [
			            "dist/",
			          ],
			          "scripts": {
			            "build": "tsdown",
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
			    "tsdown.config.ts": [
			      "import { defineConfig } from "tsdown";

			export default defineConfig({ entry: ["src/index.ts"], unbundle: true });
			",
			      {
			        "previously": [
			          "tsup.config.ts",
			        ],
			      },
			    ],
			  },
			  "scripts": undefined,
			}
		`);
	});

	test("with props", () => {
		const creation = testBlock(blockTSDown, {
			options: optionsBase,
			props: {
				entry: ["src/other.ts"],
				exports: "./dist/other.mjs",
				main: "./dist/other.mjs",
				properties: {
					dts: false,
				},
				runInCI: ["lib/other.js"],
			},
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
			Run [**tsdown**](https://tsdown.dev) locally to build source files from \`src/\` into output files in \`dist/\`:

			\`\`\`shell
			pnpm build
			\`\`\`

			Add \`--watch\` to run the builder in a watch mode that continuously cleans and recreates \`dist/\` as you save files:

			\`\`\`shell
			pnpm build --watch
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
			              {
			                "run": "lib/other.js",
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
			            "tsdown": "0.0.0-mock",
			          },
			          "exports": {
			            ".": "./dist/other.mjs",
			          },
			          "files": [
			            "dist/",
			          ],
			          "main": "./dist/other.mjs",
			          "scripts": {
			            "build": "tsdown",
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
			    "tsdown.config.ts": [
			      "import { defineConfig } from "tsdown";

			export default defineConfig({
				entry: ["src/index.ts", "src/other.ts"],
				unbundle: true,
				dts: false,
			});
			",
			      {
			        "previously": [
			          "tsup.config.ts",
			        ],
			      },
			    ],
			  },
			  "scripts": undefined,
			}
		`);
	});

	test("with an explicit outDir", () => {
		const creation = testBlock(blockTSDown, {
			options: optionsBase,
			props: {
				properties: {
					outDir: "build",
				},
			},
		});

		expect(creation.files).toEqual({
			"tsdown.config.ts": [
				`import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["src/index.ts"],
	unbundle: true,
	outDir: "build",
});
`,
				{ previously: ["tsup.config.ts"] },
			],
		});
	});

	test("with the bundle option", () => {
		const creation = testBlock(blockTSDown, {
			options: { ...optionsBase, bundle: true },
			props: {
				entry: ["src/other.ts"],
			},
		});

		expect(creation.files).toEqual({
			"tsdown.config.ts": [
				`import { defineConfig } from "tsdown";

export default defineConfig({ entry: ["src/index.ts", "src/other.ts"] });
`,
				{ previously: ["tsup.config.ts"] },
			],
		});
	});

	test("transition mode", () => {
		const creation = testBlock(blockTSDown, {
			mode: "transition",
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
			Run [**tsdown**](https://tsdown.dev) locally to build source files from \`src/\` into output files in \`dist/\`:

			\`\`\`shell
			pnpm build
			\`\`\`

			Add \`--watch\` to run the builder in a watch mode that continuously cleans and recreates \`dist/\` as you save files:

			\`\`\`shell
			pnpm build --watch
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
			        "removals": [
			          "/lib",
			          "dist/",
			          "lib/",
			        ],
			      },
			    },
			    {
			      "block": "[Block Package JSON]",
			      "props": {
			        "outdatedFiles": [
			          "lib/",
			        ],
			        "properties": {
			          "devDependencies": {
			            "tsdown": "0.0.0-mock",
			          },
			          "files": [
			            "dist/",
			          ],
			          "scripts": {
			            "build": "tsdown",
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
			    {
			      "block": "[Block Remove Dependencies]",
			      "props": {
			        "dependencies": [
			          "@babel/cli",
			          "@babel/core",
			          "@babel/preset-typescript",
			          "babel",
			        ],
			      },
			    },
			    {
			      "block": "[Block Remove Files]",
			      "props": {
			        "files": [
			          ".babelrc*",
			          "babel.config.*",
			          "dist",
			          "lib",
			          "tsup.config.*",
			        ],
			      },
			    },
			    {
			      "block": "[Block Remove Workflows]",
			      "props": {
			        "workflows": [
			          "build",
			          "tsup",
			        ],
			      },
			    },
			  ],
			  "files": {
			    "tsdown.config.ts": [
			      "import { defineConfig } from "tsdown";

			export default defineConfig({ entry: ["src/index.ts"], unbundle: true });
			",
			      {
			        "previously": [
			          "tsup.config.ts",
			        ],
			      },
			    ],
			  },
			}
		`);
	});

	describe("intake", () => {
		it("returns undefined when ts*.config.ts does not exist", () => {
			const actual = testIntake(blockTSDown, {
				files: {},
			});

			expect(actual).toBeUndefined();
		});

		it("returns undefined when tsdown.config.ts does not contain data", () => {
			const actual = testIntake(blockTSDown, {
				files: {
					"tsdown.config.ts": ["..."],
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns undefined when tsdown.config.ts does not contain properties", () => {
			const actual = testIntake(blockTSDown, {
				files: {
					"tsdown.config.ts": [`defineConfig(${JSON.stringify({})})`],
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns entry when tsdown.config.ts contains entry", () => {
			const entry = ["src/other.ts"];

			const actual = testIntake(blockTSDown, {
				files: {
					"tsdown.config.ts": [`defineConfig(${JSON.stringify({ entry })})`],
				},
			});

			expect(actual).toEqual({ entry, properties: { fixedExtension: false } });
		});

		it("drops sourcemap when tsup.config.ts contains it", () => {
			const actual = testIntake(blockTSDown, {
				files: {
					"tsup.config.ts": [
						`defineConfig(${JSON.stringify({ entry: ["src/other.ts"], sourcemap: true })})`,
					],
				},
			});

			expect(actual).toEqual({
				entry: ["src/other.ts"],
				properties: { fixedExtension: false },
			});
		});

		it("drops exclusion globs from entry when tsdown.config.ts contains them", () => {
			const actual = testIntake(blockTSDown, {
				files: {
					"tsdown.config.ts": [
						`defineConfig(${JSON.stringify({ entry: ["src/**/*.ts", "!src/**/*.test.*", "src/other.ts"] })})`,
					],
				},
			});

			expect(actual).toEqual({
				entry: ["src/other.ts"],
				properties: { fixedExtension: false },
			});
		});

		describe("files the old src/**/*.ts entry built", () => {
			const legacyConfig = `defineConfig(${JSON.stringify({
				bundle: false,
				entry: ["src/**/*.ts", "!src/**/*.test.*"],
				outDir: "lib",
			})})`;

			it("adds a source file imported by a bin file from the build output", () => {
				const actual = testIntake(blockTSDown, {
					files: {
						bin: {
							"index.js": [
								`#!/usr/bin/env node\nimport { cli } from "../lib/cli.js";\n\nawait cli(process.argv.slice(2));\n`,
							],
						},
						"package.json": [
							JSON.stringify({
								bin: { "test-repository": "./bin/index.js" },
								main: "lib/index.js",
							}),
						],
						src: {
							"cli.ts": ["export async function cli() {}"],
							"index.ts": ["export {};"],
						},
						"tsup.config.ts": [legacyConfig],
					},
				});

				expect(actual?.entry).toEqual(["src/cli.ts"]);
			});

			it("adds a nested source file imported by a bin file", () => {
				const actual = testIntake(blockTSDown, {
					files: {
						bin: {
							"index.js": [
								`import { githubCli } from "../lib/cli/githubCli.js";`,
							],
						},
						"package.json": [JSON.stringify({ bin: "bin/index.js" })],
						src: {
							cli: { "githubCli.ts": ["export {};"] },
							"index.ts": ["export {};"],
						},
						"tsup.config.ts": [legacyConfig],
					},
				});

				expect(actual?.entry).toEqual(["src/cli/githubCli.ts"]);
			});

			it("adds source files for package.json exports conditions and browser", () => {
				const actual = testIntake(blockTSDown, {
					files: {
						"package.json": [
							JSON.stringify({
								browser: "./lib/browser.js",
								exports: {
									".": {
										browser: "./lib/browser.js",
										default: "./lib/index.js",
										types: "./lib/index.d.ts",
									},
									"./package.json": "./package.json",
								},
								main: "lib/index.js",
							}),
						],
						src: {
							"browser.ts": ["export {};"],
							"index.ts": ["export {};"],
						},
						"tsdown.config.ts": [legacyConfig],
					},
				});

				expect(actual?.entry).toEqual(["src/browser.ts"]);
			});

			it("adds a source file for a bin inside the build output", () => {
				const actual = testIntake(blockTSDown, {
					files: {
						"package.json": [JSON.stringify({ bin: "lib/cli.js" })],
						src: {
							"cli.ts": ["export {};"],
							"index.ts": ["export {};"],
						},
						"tsup.config.ts": [legacyConfig],
					},
				});

				expect(actual?.entry).toEqual(["src/cli.ts"]);
			});

			it("uses the build output directory from the config", () => {
				const actual = testIntake(blockTSDown, {
					files: {
						bin: {
							"index.js": [
								`import "../build/cli.js";\nimport "../lib/other.js";`,
							],
						},
						"package.json": [JSON.stringify({ bin: "bin/index.js" })],
						src: {
							"cli.ts": ["export {};"],
							"other.ts": ["export {};"],
						},
						"tsdown.config.ts": [
							`defineConfig(${JSON.stringify({ entry: ["src/**/*.ts"], outDir: "build" })})`,
						],
					},
				});

				expect(actual?.entry).toEqual(["src/cli.ts"]);
			});

			it("skips referenced output files without a source file", () => {
				const actual = testIntake(blockTSDown, {
					files: {
						bin: { "index.js": [`import "../lib/missing.js";`] },
						"package.json": [JSON.stringify({ bin: "bin/index.js" })],
						src: { "index.ts": ["export {};"] },
						"tsup.config.ts": [legacyConfig],
					},
				});

				expect(actual?.entry).toEqual([]);
			});

			it("skips a bin file that does not exist", () => {
				const actual = testIntake(blockTSDown, {
					files: {
						"package.json": [JSON.stringify({ bin: "bin/index.js" })],
						src: {
							"cli.ts": ["export {};"],
							"index.ts": ["export {};"],
						},
						"tsup.config.ts": [legacyConfig],
					},
				});

				expect(actual?.entry).toEqual([]);
			});

			it("does not add referenced files when the config did not use src/**/*.ts", () => {
				const actual = testIntake(blockTSDown, {
					files: {
						bin: { "index.js": [`import "../dist/cli.js";`] },
						"package.json": [JSON.stringify({ bin: "bin/index.js" })],
						src: {
							"cli.ts": ["export {};"],
							"index.ts": ["export {};"],
						},
						"tsdown.config.ts": [
							`defineConfig(${JSON.stringify({ entry: ["src/index.ts"] })})`,
						],
					},
				});

				expect(actual?.entry).toEqual([]);
			});
		});

		it.each(["src/**/*.ts", "src/index.ts"])(
			"drops the default entry %j from entry when tsdown.config.ts contains it",
			(defaultEntry) => {
				const actual = testIntake(blockTSDown, {
					files: {
						"tsdown.config.ts": [
							`defineConfig(${JSON.stringify({ entry: [defaultEntry, "src/other.ts"] })})`,
						],
					},
				});

				expect(actual).toEqual({
					entry: ["src/other.ts"],
					properties: { fixedExtension: false },
				});
			},
		);

		it.each([true, false])(
			"drops unbundle from properties when tsdown.config.ts contains unbundle: %j",
			(unbundle) => {
				const actual = testIntake(blockTSDown, {
					files: {
						"tsdown.config.ts": [
							`defineConfig(${JSON.stringify({ clean: false, unbundle })})`,
						],
					},
				});

				expect(actual).toEqual({
					entry: undefined,
					properties: { clean: false, fixedExtension: false },
				});
			},
		);

		it("returns the properties when tsdown.config.ts contains other properties", () => {
			const properties = { clean: false, dts: false, format: "cjs" };

			const actual = testIntake(blockTSDown, {
				files: {
					"tsdown.config.ts": [`defineConfig(${JSON.stringify(properties)})`],
				},
			});

			expect(actual).toEqual({ entry: undefined, properties });
		});

		it("returns outDir in properties when tsdown.config.ts contains a custom outDir", () => {
			const actual = testIntake(blockTSDown, {
				files: {
					"tsdown.config.ts": [
						`defineConfig(${JSON.stringify({ outDir: "build" })})`,
					],
				},
			});

			expect(actual).toEqual({
				entry: undefined,
				properties: { fixedExtension: false, outDir: "build" },
			});
		});

		it.each(["lib", "./lib", "lib/", "./lib/"])(
			"drops outDir when tsdown.config.ts contains the legacy lib outDir as %j",
			(outDir) => {
				const actual = testIntake(blockTSDown, {
					files: {
						"tsdown.config.ts": [`defineConfig(${JSON.stringify({ outDir })})`],
					},
				});

				expect(actual).toEqual({
					entry: undefined,
					properties: { fixedExtension: false },
				});
			},
		);
		describe("fixedExtension", () => {
			const config = `defineConfig(${JSON.stringify({ entry: ["src/index.ts"] })})`;

			it("is pinned to false when the config omits it and package.json has no entry point", () => {
				const actual = testIntake(blockTSDown, {
					files: {
						"package.json": [JSON.stringify({ name: "test" })],
						"tsdown.config.ts": [config],
					},
				});

				expect(actual?.properties).toEqual({ fixedExtension: false });
			});

			it("is pinned to false when the config omits it and package.json main is a .js file", () => {
				const actual = testIntake(blockTSDown, {
					files: {
						"package.json": [JSON.stringify({ main: "lib/index.js" })],
						"tsup.config.ts": [config],
					},
				});

				expect(actual?.properties).toEqual({ fixedExtension: false });
			});

			it("is pinned to false when the config omits it and package.json exports is a .js file", () => {
				const actual = testIntake(blockTSDown, {
					files: {
						"package.json": [
							JSON.stringify({ exports: { ".": "./lib/index.js" } }),
						],
						"tsdown.config.ts": [config],
					},
				});

				expect(actual?.properties).toEqual({ fixedExtension: false });
			});

			it("is pinned to false when the config omits it and package.json exports is a .js string", () => {
				const actual = testIntake(blockTSDown, {
					files: {
						"package.json": [JSON.stringify({ exports: "./lib/index.js" })],
						"tsdown.config.ts": [config],
					},
				});

				expect(actual?.properties).toEqual({ fixedExtension: false });
			});

			it("is left alone when package.json exports '.' is an object", () => {
				const actual = testIntake(blockTSDown, {
					files: {
						"package.json": [
							JSON.stringify({
								exports: { ".": { default: "./lib/index.js" } },
							}),
						],
						"tsdown.config.ts": [config],
					},
				});

				expect(actual?.properties).toBeUndefined();
			});

			it("is left alone when package.json exports is a .mjs file", () => {
				const actual = testIntake(blockTSDown, {
					files: {
						"package.json": [
							JSON.stringify({ exports: { ".": "./lib/index.mjs" } }),
						],
						"tsdown.config.ts": [config],
					},
				});

				expect(actual?.properties).toBeUndefined();
			});

			it("is left alone when the config has a non-esm format", () => {
				const actual = testIntake(blockTSDown, {
					files: {
						"package.json": [JSON.stringify({ main: "lib/index.js" })],
						"tsup.config.ts": [
							`defineConfig(${JSON.stringify({ format: ["cjs", "esm"] })})`,
						],
					},
				});

				expect(actual?.properties).toEqual({ format: ["cjs", "esm"] });
			});

			it("is preserved when the config sets it", () => {
				const actual = testIntake(blockTSDown, {
					files: {
						"package.json": [JSON.stringify({ main: "lib/index.js" })],
						"tsdown.config.ts": [
							`defineConfig(${JSON.stringify({ fixedExtension: true })})`,
						],
					},
				});

				expect(actual?.properties).toEqual({ fixedExtension: true });
			});
		});

		it("clears tsup default properties when tsup.config.ts contains them", () => {
			const properties = { bundle: true, clean: true, format: "esm" };

			const actual = testIntake(blockTSDown, {
				files: {
					"tsup.config.ts": [`defineConfig(${JSON.stringify(properties)})`],
				},
			});

			expect(actual).toEqual({
				entry: undefined,
				properties: { fixedExtension: false },
			});
		});
	});
});
