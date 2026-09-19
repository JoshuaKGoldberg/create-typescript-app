import { testBlock, testIntake } from "bingo-stratum-testers";
import { describe, expect, it, test, vi } from "vitest";

import { blockKnip } from "./blockKnip.js";
import { optionsBase } from "./options.fakes.js";

vi.mock("../utils/resolveBin.js", () => ({
	resolveBin: (bin: string) => `path/to/${bin}`,
}));

describe(blockKnip, () => {
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
			            "knip": "6.32.2",
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
			          ".ts-prunerc*",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "extensions": [
			          "webpro.vscode-knip",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "knip.config.ts": "import type { KnipConfig } from "knip";

			export default {"ignoreExportsUsedInFile":{"interface":true,"type":true},"treatConfigHintsAsErrors":true} satisfies KnipConfig;",
			  },
			}
		`);
	});

	test("with addons", () => {
		const creation = testBlock(blockKnip, {
			addons: {
				entry: ["src/index.ts"],
				ignoreDependencies: ["abc", "def"],
				project: ["src/**/*.ts"],
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
			            "knip": "6.32.2",
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
			          ".ts-prunerc*",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "extensions": [
			          "webpro.vscode-knip",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "knip.config.ts": "import type { KnipConfig } from "knip";

			export default {"entry":["src/index.ts"],"ignoreDependencies":["abc","def"],"ignoreExportsUsedInFile":{"interface":true,"type":true},"project":["src/**/*.ts"],"treatConfigHintsAsErrors":true} satisfies KnipConfig;",
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
			            "knip": "6.32.2",
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
			          ".ts-prunerc*",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "extensions": [
			          "webpro.vscode-knip",
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
			    "knip.config.ts": "import type { KnipConfig } from "knip";

			export default {"ignoreExportsUsedInFile":{"interface":true,"type":true},"treatConfigHintsAsErrors":true} satisfies KnipConfig;",
			  },
			}
		`);
	});

	describe("intake", () => {
		it("returns undefined when knip.config.ts and knip.json do not exist", () => {
			const actual = testIntake(blockKnip, {
				files: {},
			});

			expect(actual).toBeUndefined();
		});

		it("returns undefined when knip.config.ts exists and does not contain ignoreDependencies", () => {
			const actual = testIntake(blockKnip, {
				files: {
					"knip.config.ts": [`export default { other: true };`],
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns ignoreDependencies when knip.config.ts exists and contains ignoreDependencies", () => {
			const ignoreDependencies = ["a", "b", "c"];

			const actual = testIntake(blockKnip, {
				files: {
					"knip.config.ts": [
						`export default { ignoreDependencies: ${JSON.stringify(ignoreDependencies)} };`,
					],
				},
			});

			expect(actual).toEqual({ ignoreDependencies });
		});

		it("returns undefined when knip.json exists and does not contain ignoreDependencies", () => {
			const actual = testIntake(blockKnip, {
				files: {
					"knip.json": [JSON.stringify({ other: true })],
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns ignoreDependencies when knip.json exists and contains ignoreDependencies", () => {
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
