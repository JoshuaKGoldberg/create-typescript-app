import { testBlock, testIntake } from "bingo-stratum-testers";
import { describe, expect, it, test, vi } from "vitest";

import { blockKnip } from "./blockKnip.js";
import { optionsBase } from "./options.fakes.js";

vi.mock("../utils/resolveBin.js", () => ({
	resolveBin: (bin: string) => `path/to/${bin}`,
}));

describe("blockKnip", () => {
	test("without addons", () => {
		const creation = testBlock(blockKnip, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "sections": {
			          "Linting": {
			            "contents": {
			              "items": [
			                "- \`pnpm lint:knip\` ([knip](https://github.com/webpro/knip)): Detects unused files, dependencies, and code exports",
			              ],
			            },
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "jobs": [
			          {
			            "name": "Lint Knip",
			            "steps": [
			              {
			                "run": "pnpm lint:knip",
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
			            "knip": "5.46.0",
			          },
			          "scripts": {
			            "lint:knip": "knip",
			          },
			        },
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "knip.json": "{"$schema":"https://unpkg.com/knip@5.46.0/schema.json","entry":["src/index.ts","src/**/*.test.*"],"ignoreExportsUsedInFile":{"interface":true,"type":true},"project":["src/**/*.ts"]}",
			  },
			}
		`);
	});

	test("with addons", () => {
		const creation = testBlock(blockKnip, {
			addons: {
				ignoreDependencies: ["abc", "def"],
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "sections": {
			          "Linting": {
			            "contents": {
			              "items": [
			                "- \`pnpm lint:knip\` ([knip](https://github.com/webpro/knip)): Detects unused files, dependencies, and code exports",
			              ],
			            },
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "jobs": [
			          {
			            "name": "Lint Knip",
			            "steps": [
			              {
			                "run": "pnpm lint:knip",
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
			            "knip": "5.46.0",
			          },
			          "scripts": {
			            "lint:knip": "knip",
			          },
			        },
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "knip.json": "{"$schema":"https://unpkg.com/knip@5.46.0/schema.json","entry":["src/index.ts","src/**/*.test.*"],"ignoreDependencies":["abc","def"],"ignoreExportsUsedInFile":{"interface":true,"type":true},"project":["src/**/*.ts"]}",
			  },
			}
		`);
	});

	test("transition mode", () => {
		const creation = testBlock(blockKnip, {
			mode: "transition",
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "sections": {
			          "Linting": {
			            "contents": {
			              "items": [
			                "- \`pnpm lint:knip\` ([knip](https://github.com/webpro/knip)): Detects unused files, dependencies, and code exports",
			              ],
			            },
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "jobs": [
			          {
			            "name": "Lint Knip",
			            "steps": [
			              {
			                "run": "pnpm lint:knip",
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
			            "knip": "5.46.0",
			          },
			          "scripts": {
			            "lint:knip": "knip",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "files": [
			          ".knip*",
			          "knip.{c,m,t}*",
			          "knip.js",
			          "knip.jsonc",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "workflows": [
			          "knip",
			          "lint-knip",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "knip.json": "{"$schema":"https://unpkg.com/knip@5.46.0/schema.json","entry":["src/index.ts","src/**/*.test.*"],"ignoreExportsUsedInFile":{"interface":true,"type":true},"project":["src/**/*.ts"]}",
			  },
			}
		`);
	});

	describe("intake", () => {
		it("returns undefined when knip.json does not exist", () => {
			const actual = testIntake(blockKnip, {
				files: {},
			});

			expect(actual).toBeUndefined();
		});

		it("returns undefined when knip.json does not contain ignoreDependencies", () => {
			const actual = testIntake(blockKnip, {
				files: {
					"knip.json": [JSON.stringify({ other: true })],
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns ignoreDependencies when knip.json contains ignoreDependencies", () => {
			const ignoreDependencies = ["a", "b", "c"];

			const actual = testIntake(blockKnip, {
				files: {
					"knip.json": [JSON.stringify({ ignoreDependencies })],
				},
			});

			expect(actual).toEqual({ ignoreDependencies });
		});
	});
});
