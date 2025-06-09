import { testBlock, testIntake } from "bingo-stratum-testers";
import { describe, expect, it, test } from "vitest";

import { blockNcc } from "./blockNcc.js";
import { optionsBase } from "./options.fakes.js";

describe("blockNcc", () => {
	test("without addons", () => {
		const creation = testBlock(blockNcc, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "ignorePaths": [
			          "dist",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "sections": {
			          "Building": {
			            "contents": "
			Run [TypeScript](https://typescriptlang.org) locally to type check and build source files from \`src/\` into output files in \`lib/\`:

			\`\`\`shell
			pnpm build
			\`\`\`

			Add \`--watch\` to run the builder in a watch mode that continuously cleans and recreates \`lib/\` as you save files:

			\`\`\`shell
			pnpm build --watch
			\`\`\`
			",
			            "innerSections": [
			              {
			                "contents": "
			Run [\`@vercel/ncc\`](https://github.com/vercel/ncc) to create an output \`dist/\` to be used in production.

			\`\`\`shell
			pnpm build:release
			\`\`\`
					",
			                "heading": "Building for Release",
			              },
			            ],
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "ignores": [
			          "dist",
			        ],
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
			          {
			            "name": "Build (Release)",
			            "steps": [
			              {
			                "run": "pnpm build:release",
			              },
			            ],
			          },
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "@vercel/ncc": "^0.38.3",
			          },
			          "scripts": {
			            "build": "tsc",
			            "build:release": "ncc build src/index.ts -o dist",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "ignores": [
			          "/dist",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			}
		`);
	});

	test("with addons", () => {
		const creation = testBlock(blockNcc, {
			addons: {
				entry: "src/action/index.ts",
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "ignorePaths": [
			          "dist",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "sections": {
			          "Building": {
			            "contents": "
			Run [TypeScript](https://typescriptlang.org) locally to type check and build source files from \`src/\` into output files in \`lib/\`:

			\`\`\`shell
			pnpm build
			\`\`\`

			Add \`--watch\` to run the builder in a watch mode that continuously cleans and recreates \`lib/\` as you save files:

			\`\`\`shell
			pnpm build --watch
			\`\`\`
			",
			            "innerSections": [
			              {
			                "contents": "
			Run [\`@vercel/ncc\`](https://github.com/vercel/ncc) to create an output \`dist/\` to be used in production.

			\`\`\`shell
			pnpm build:release
			\`\`\`
					",
			                "heading": "Building for Release",
			              },
			            ],
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "ignores": [
			          "dist",
			        ],
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
			          {
			            "name": "Build (Release)",
			            "steps": [
			              {
			                "run": "pnpm build:release",
			              },
			            ],
			          },
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "@vercel/ncc": "^0.38.3",
			          },
			          "scripts": {
			            "build": "tsc",
			            "build:release": "ncc build src/action/index.ts -o dist",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "ignores": [
			          "/dist",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			}
		`);
	});

	describe("intake", () => {
		it("returns an undefined entry when options.packageData does not exist", () => {
			const actual = testIntake(blockNcc, {
				files: {},
				options: {
					...optionsBase,
					packageData: undefined,
				},
			});

			expect(actual).toEqual({ entry: undefined });
		});

		it("returns an undefined entry when options.packageData does not contain scripts", () => {
			const actual = testIntake(blockNcc, {
				files: {},
				options: {
					...optionsBase,
					packageData: {},
				},
			});

			expect(actual).toEqual({ entry: undefined });
		});

		it("returns an undefined entry when options.packageData does not contain a build:release script", () => {
			const actual = testIntake(blockNcc, {
				files: {},
				options: {
					...optionsBase,
					packageData: {
						scripts: {},
					},
				},
			});

			expect(actual).toEqual({ entry: undefined });
		});

		it("returns an undefined entry when options.packageData contains an unrelated build:release script", () => {
			const actual = testIntake(blockNcc, {
				files: {},
				options: {
					...optionsBase,
					packageData: {
						scripts: {
							"build:release": "tsdown",
						},
					},
				},
			});

			expect(actual).toEqual({ entry: undefined });
		});

		it("returns a parsed entry when options.packageData contains a matching build:release script", () => {
			const actual = testIntake(blockNcc, {
				files: {},
				options: {
					...optionsBase,
					packageData: {
						scripts: {
							"build:release": "ncc build src/action/index.ts -o dist",
						},
					},
				},
			});

			expect(actual).toEqual({ entry: "src/action/index.ts" });
		});
	});
});
