import { testBlock, testIntake } from "bingo-stratum-testers";
import { describe, expect, it, test } from "vitest";

import { blockTSDown } from "./blockTSDown.js";
import { optionsBase } from "./options.fakes.js";

describe("blockTSDown", () => {
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
			Run [**tsdown**](https://tsdown.dev) locally to build source files from \`src/\` into output files in \`lib/\`:

			\`\`\`shell
			pnpm build
			\`\`\`

			Add \`--watch\` to run the builder in a watch mode that continuously cleans and recreates \`lib/\` as you save files:

			\`\`\`shell
			pnpm build --watch
			\`\`\`
			",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "beforeLint": "Note that you'll need to run \`pnpm build\` before \`pnpm lint\` so that lint rules which check the file system can pick up on any built files.",
			      },
			      "block": [Function],
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "entry": [
			          "src/index.ts",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "tsdown": "0.12.7",
			          },
			          "scripts": {
			            "build": "tsdown",
			          },
			        },
			      },
			      "block": [Function],
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
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "tsdown.config.ts": "import { defineConfig } from "tsdown";

			export default defineConfig({"dts":true,"entry":["src/**/*.ts"],"outDir":"lib","unbundle":true});
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
			Run [**tsdown**](https://tsdown.dev) locally to build source files from \`src/\` into output files in \`lib/\`:

			\`\`\`shell
			pnpm build
			\`\`\`

			Add \`--watch\` to run the builder in a watch mode that continuously cleans and recreates \`lib/\` as you save files:

			\`\`\`shell
			pnpm build --watch
			\`\`\`
			",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "beforeLint": "Note that you'll need to run \`pnpm build\` before \`pnpm lint\` so that lint rules which check the file system can pick up on any built files.",
			      },
			      "block": [Function],
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "entry": [
			          "src/index.ts",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "tsdown": "0.12.7",
			          },
			          "scripts": {
			            "build": "tsdown",
			          },
			        },
			      },
			      "block": [Function],
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
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "tsdown.config.ts": "import { defineConfig } from "tsdown";

			export default defineConfig({"dts":false,"entry":["src/**/*.ts","src/other.ts"],"outDir":"lib","unbundle":true});
			",
			  },
			  "scripts": undefined,
			}
		`);
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
			Run [**tsdown**](https://tsdown.dev) locally to build source files from \`src/\` into output files in \`lib/\`:

			\`\`\`shell
			pnpm build
			\`\`\`

			Add \`--watch\` to run the builder in a watch mode that continuously cleans and recreates \`lib/\` as you save files:

			\`\`\`shell
			pnpm build --watch
			\`\`\`
			",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "beforeLint": "Note that you'll need to run \`pnpm build\` before \`pnpm lint\` so that lint rules which check the file system can pick up on any built files.",
			      },
			      "block": [Function],
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "entry": [
			          "src/index.ts",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "tsdown": "0.12.7",
			          },
			          "scripts": {
			            "build": "tsdown",
			          },
			        },
			      },
			      "block": [Function],
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
			      "block": [Function],
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
			      "block": [Function],
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "workflows": [
			          "build",
			          "tsup",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "tsdown.config.ts": "import { defineConfig } from "tsdown";

			export default defineConfig({"dts":true,"entry":["src/**/*.ts"],"outDir":"lib","unbundle":true});
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
			const entry = ["src/index.ts", "src/other.ts"];

			const actual = testIntake(blockTSDown, {
				files: {
					"tsdown.config.ts": [`defineConfig(${JSON.stringify({ entry })})`],
				},
			});

			expect(actual).toEqual({ entry });
		});

		it("returns the properties when tsdown.config.ts contains other properties", () => {
			const properties = { clean: false, dts: false, format: "cjs" };

			const actual = testIntake(blockTSDown, {
				files: {
					"tsdown.config.ts": [`defineConfig(${JSON.stringify(properties)})`],
				},
			});

			expect(actual).toEqual({ entry: undefined, properties });
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
				properties: undefined,
			});
		});
	});
});
