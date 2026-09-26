import { testBlock, testIntake } from "bingo-stratum-testers";
import { describe, expect, it, test, vi } from "vitest";

import { blockTSDown } from "./blockTSDown.ts";
import { optionsBase } from "./options.fakes.ts";

vi.mock("../data/packageData.ts", () => ({
	getPackageDependencies: (...names: string[]) =>
		Object.fromEntries(names.map((name) => [name, "0.0.0-mock"])),
}));

describe(blockTSDown, () => {
	test("without addons or options", () => {
		const creation = testBlock(blockTSDown, {
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
			        "properties": {
			          "devDependencies": {
			            "tsdown": "0.0.0-mock",
			          },
			          "scripts": {
			            "build": "tsdown",
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
			    "tsdown.config.ts": "import { defineConfig } from "tsdown";

			export default defineConfig({"entry":["src/**/*.ts"],"unbundle":true});
			",
			  },
			  "scripts": undefined,
			}
		`);
	});

	test("with addons", () => {
		const creation = testBlock(blockTSDown, {
			addons: {
				entry: ["src/other.ts"],
				properties: {
					dts: false,
				},
				runInCI: ["lib/other.js"],
			},
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
			              {
			                "run": "lib/other.js",
			              },
			            ],
			          },
			        ],
			      },
			      "block": "[Block GitHub Actions CI]",
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "tsdown": "0.0.0-mock",
			          },
			          "scripts": {
			            "build": "tsdown",
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
			    "tsdown.config.ts": "import { defineConfig } from "tsdown";

			export default defineConfig({"entry":["src/**/*.ts","src/other.ts"],"unbundle":true,"dts":false});
			",
			  },
			  "scripts": undefined,
			}
		`);
	});

	test("with an explicit outDir", () => {
		const creation = testBlock(blockTSDown, {
			addons: {
				properties: {
					outDir: "build",
				},
			},
			options: optionsBase,
		});

		expect(creation.files).toEqual({
			"tsdown.config.ts": `import { defineConfig } from "tsdown";

export default defineConfig({"entry":["src/**/*.ts"],"unbundle":true,"outDir":"build"});
`,
		});
	});

	test("with the bundle option", () => {
		const creation = testBlock(blockTSDown, {
			addons: {
				entry: ["src/other.ts"],
			},
			options: { ...optionsBase, bundle: true },
		});

		expect(creation.files).toEqual({
			"tsdown.config.ts": `import { defineConfig } from "tsdown";

export default defineConfig({"entry":["src/index.ts","src/other.ts"]});
`,
		});
	});

	test("transition mode", () => {
		const creation = testBlock(blockTSDown, {
			mode: "transition",
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
			        "properties": {
			          "devDependencies": {
			            "tsdown": "0.0.0-mock",
			          },
			          "scripts": {
			            "build": "tsdown",
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
			    {
			      "addons": {
			        "dependencies": [
			          "@babel/cli",
			          "@babel/core",
			          "@babel/preset-typescript",
			          "babel",
			        ],
			      },
			      "block": "[Block Remove Dependencies]",
			    },
			    {
			      "addons": {
			        "files": [
			          ".babelrc*",
			          "babel.config.*",
			          "dist",
			          "lib",
			          "tsup.config.*",
			        ],
			      },
			      "block": "[Block Remove Files]",
			    },
			    {
			      "addons": {
			        "workflows": [
			          "build",
			          "tsup",
			        ],
			      },
			      "block": "[Block Remove Workflows]",
			    },
			  ],
			  "files": {
			    "tsdown.config.ts": "import { defineConfig } from "tsdown";

			export default defineConfig({"entry":["src/**/*.ts"],"unbundle":true});
			",
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
