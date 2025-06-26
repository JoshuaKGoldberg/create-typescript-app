import { testBlock, testIntake } from "bingo-stratum-testers";
import { describe, expect, it, test, vi } from "vitest";

import { blockTSDown } from "./blockTSDown.js";
import { optionsBase } from "./options.fakes.js";

vi.mock("../utils/resolveBin.js", () => ({
	resolveBin: (bin: string) => `path/to/${bin}`,
}));

describe("blockTSDown", () => {
	test("without addons or mode", () => {
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

	test("with addons", () => {
		const creation = testBlock(blockTSDown, {
			addons: {
				entry: ["!src/**/*.test.ts"],
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

			export default defineConfig({"dts":true,"entry":["src/**/*.ts","!src/**/*.test.ts"],"outDir":"lib","unbundle":true});
			",
			  },
			  "scripts": undefined,
			}
		`);
	});

	describe("intake", () => {
		it("returns nothing when tsdown.config.ts passes nothing to defineConfig", () => {
			const actual = testIntake(blockTSDown, {
				files: {
					"tsdown.config.ts": [`defineConfig()`],
				},
				options: optionsBase,
			});

			expect(actual).toEqual(undefined);
		});

		it("returns nothing when tsdown.config.ts passes invalid syntax to defineConfig", () => {
			const actual = testIntake(blockTSDown, {
				files: {
					"tsdown.config.ts": [`defineConfig({ ! })`],
				},
				options: optionsBase,
			});

			expect(actual).toEqual(undefined);
		});

		it("returns entry when it exists alone in tsdown.config.ts", () => {
			const actual = testIntake(blockTSDown, {
				files: {
					"tsdown.config.ts": [
						`import { defineConfig } from "tsdown";
	
export default defineConfig({
	entry: ["src/**/*.ts", "!src/**/*.test.*"],
});
	`,
					],
				},
				options: optionsBase,
			});

			expect(actual).toEqual({
				entry: ["src/**/*.ts", "!src/**/*.test.*"],
				properties: {},
			});
		});

		it("returns other properties when they exists without entry in tsdown.config.ts", () => {
			const actual = testIntake(blockTSDown, {
				files: {
					"tsdown.config.ts": [
						`import { defineConfig } from "tsdown";
	
export default defineConfig({
	unbundle: true,
	format: "esm",
});
	`,
					],
				},
				options: optionsBase,
			});

			expect(actual).toEqual({
				properties: {
					format: "esm",
					unbundle: true,
				},
			});
		});

		it("returns entry and other properties when they all exist in tsdown.config.ts", () => {
			const actual = testIntake(blockTSDown, {
				files: {
					"tsdown.config.ts": [
						`import { defineConfig } from "tsdown";
	
export default defineConfig({
	unbundle: true,
	entry: ["src/**/*.ts", "!src/**/*.test.*"],
	format: "esm",
});
	`,
					],
				},
				options: optionsBase,
			});

			expect(actual).toEqual({
				entry: ["src/**/*.ts", "!src/**/*.test.*"],
				properties: {
					format: "esm",
					unbundle: true,
				},
			});
		});

		it("returns entry and other properties other than bundle when they all exist in tsup.config.ts", () => {
			const actual = testIntake(blockTSDown, {
				files: {
					"tsup.config.ts": [
						`import { defineConfig } from "tsup";
	
export default defineConfig({
	bundle: false,
	entry: ["src/**/*.ts", "!src/**/*.test.*"],
	format: "esm",
});
	`,
					],
				},
				options: optionsBase,
			});

			expect(actual).toEqual({
				entry: ["src/**/*.ts", "!src/**/*.test.*"],
				properties: {
					format: "esm",
				},
			});
		});
	});
});
