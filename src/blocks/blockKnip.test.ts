import { testBlock, testIntake } from "bingo-stratum-testers";
import { describe, expect, it, test, vi } from "vitest";

import { blockKnip } from "./blockKnip.ts";
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

vi.mock("../utils/resolveBin.ts", () => ({
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
			      "block": "[Block Development Docs]",
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
			      "block": "[Block GitHub Actions CI]",
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "knip": "0.0.0-mock",
			          },
			          "scripts": {
			            "lint:knip": "knip",
			          },
			        },
			      },
			      "block": "[Block Package JSON]",
			    },
			    {
			      "addons": {
			        "files": [
			          ".ts-prunerc*",
			        ],
			      },
			      "block": "[Block Remove Files]",
			    },
			    {
			      "addons": {
			        "extensions": [
			          "webpro.vscode-knip",
			        ],
			      },
			      "block": "[Block VS Code]",
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
			      "block": "[Block Development Docs]",
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
			      "block": "[Block GitHub Actions CI]",
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "knip": "0.0.0-mock",
			          },
			          "scripts": {
			            "lint:knip": "knip",
			          },
			        },
			      },
			      "block": "[Block Package JSON]",
			    },
			    {
			      "addons": {
			        "files": [
			          ".ts-prunerc*",
			        ],
			      },
			      "block": "[Block Remove Files]",
			    },
			    {
			      "addons": {
			        "extensions": [
			          "webpro.vscode-knip",
			        ],
			      },
			      "block": "[Block VS Code]",
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
			      "block": "[Block Development Docs]",
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
			      "block": "[Block GitHub Actions CI]",
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "knip": "0.0.0-mock",
			          },
			          "scripts": {
			            "lint:knip": "knip",
			          },
			        },
			      },
			      "block": "[Block Package JSON]",
			    },
			    {
			      "addons": {
			        "files": [
			          ".ts-prunerc*",
			        ],
			      },
			      "block": "[Block Remove Files]",
			    },
			    {
			      "addons": {
			        "extensions": [
			          "webpro.vscode-knip",
			        ],
			      },
			      "block": "[Block VS Code]",
			    },
			    {
			      "addons": {
			        "workflows": [
			          "knip",
			          "lint-knip",
			        ],
			      },
			      "block": "[Block Remove Workflows]",
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
