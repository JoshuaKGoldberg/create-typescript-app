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
	test("without props", () => {
		const creation = testBlock(blockKnip, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block Development Docs]",
			      "props": {
			        "sections": {
			          "Linting": {
			            "contents": {
			              "items": [
			                "- \`pnpm lint:knip\` ([knip](https://github.com/webpro/knip)): Detects unused files, dependencies, and code exports",
			                "- \`pnpm lint:knip:production\` ([knip](https://knip.dev/features/production-mode)): Detects unused files, dependencies, and code exports in production code, not counting usage from tests",
			              ],
			            },
			          },
			        },
			      },
			    },
			    {
			      "block": "[Block GitHub Actions CI]",
			      "props": {
			        "jobs": [
			          {
			            "name": "Lint Knip",
			            "steps": [
			              {
			                "run": "pnpm lint:knip",
			              },
			            ],
			          },
			          {
			            "name": "Lint Knip Production",
			            "steps": [
			              {
			                "run": "pnpm lint:knip:production",
			              },
			            ],
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block Package JSON]",
			      "props": {
			        "properties": {
			          "devDependencies": {
			            "knip": "0.0.0-mock",
			          },
			          "scripts": {
			            "lint:knip": "knip",
			            "lint:knip:production": "knip --production",
			          },
			        },
			      },
			    },
			    {
			      "block": "[Block Remove Files]",
			      "props": {
			        "files": [
			          ".ts-prunerc*",
			        ],
			      },
			    },
			    {
			      "block": "[Block VS Code]",
			      "props": {
			        "extensions": [
			          "webpro.vscode-knip",
			        ],
			      },
			    },
			  ],
			  "files": {
			    "knip.config.ts": [
			      "import type { KnipConfig } from "knip";

			export default {
				ignoreExportsUsedInFile: { interface: true, type: true },
				treatConfigHintsAsErrors: true,
			} satisfies KnipConfig;
			",
			      {
			        "previously": [
			          "knip.json",
			        ],
			      },
			    ],
			  },
			}
		`);
	});

	test("with props", () => {
		const creation = testBlock(blockKnip, {
			options: optionsBase,
			props: {
				entry: ["src/index.ts"],
				ignore: ["src/fixtures/**"],
				ignoreDependencies: ["abc", "def"],
				project: ["src/**/*.ts"],
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block Development Docs]",
			      "props": {
			        "sections": {
			          "Linting": {
			            "contents": {
			              "items": [
			                "- \`pnpm lint:knip\` ([knip](https://github.com/webpro/knip)): Detects unused files, dependencies, and code exports",
			                "- \`pnpm lint:knip:production\` ([knip](https://knip.dev/features/production-mode)): Detects unused files, dependencies, and code exports in production code, not counting usage from tests",
			              ],
			            },
			          },
			        },
			      },
			    },
			    {
			      "block": "[Block GitHub Actions CI]",
			      "props": {
			        "jobs": [
			          {
			            "name": "Lint Knip",
			            "steps": [
			              {
			                "run": "pnpm lint:knip",
			              },
			            ],
			          },
			          {
			            "name": "Lint Knip Production",
			            "steps": [
			              {
			                "run": "pnpm lint:knip:production",
			              },
			            ],
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block Package JSON]",
			      "props": {
			        "properties": {
			          "devDependencies": {
			            "knip": "0.0.0-mock",
			          },
			          "scripts": {
			            "lint:knip": "knip",
			            "lint:knip:production": "knip --production",
			          },
			        },
			      },
			    },
			    {
			      "block": "[Block Remove Files]",
			      "props": {
			        "files": [
			          ".ts-prunerc*",
			        ],
			      },
			    },
			    {
			      "block": "[Block VS Code]",
			      "props": {
			        "extensions": [
			          "webpro.vscode-knip",
			        ],
			      },
			    },
			  ],
			  "files": {
			    "knip.config.ts": [
			      "import type { KnipConfig } from "knip";

			export default {
				entry: ["src/index.ts"],
				ignore: ["src/fixtures/**"],
				ignoreDependencies: ["abc", "def"],
				ignoreExportsUsedInFile: { interface: true, type: true },
				project: ["src/**/*.ts"],
				treatConfigHintsAsErrors: true,
			} satisfies KnipConfig;
			",
			      {
			        "previously": [
			          "knip.json",
			        ],
			      },
			    ],
			  },
			}
		`);
	});

	test("project patterns with and without a production suffix", () => {
		const creation = testBlock(blockKnip, {
			options: optionsBase,
			props: {
				project: ["src/**/*.ts", "src/**/*.ts!", "!src/**/*.fakes.ts!"],
			},
		});

		expect(creation.files?.["knip.config.ts"]).toEqual([
			`import type { KnipConfig } from "knip";

export default {
	ignoreExportsUsedInFile: { interface: true, type: true },
	project: ["!src/**/*.fakes.ts!", "src/**/*.ts!"],
	treatConfigHintsAsErrors: true,
} satisfies KnipConfig;
`,
			{ previously: ["knip.json"] },
		]);
	});

	test("transition mode", () => {
		const creation = testBlock(blockKnip, {
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
			          "Linting": {
			            "contents": {
			              "items": [
			                "- \`pnpm lint:knip\` ([knip](https://github.com/webpro/knip)): Detects unused files, dependencies, and code exports",
			                "- \`pnpm lint:knip:production\` ([knip](https://knip.dev/features/production-mode)): Detects unused files, dependencies, and code exports in production code, not counting usage from tests",
			              ],
			            },
			          },
			        },
			      },
			    },
			    {
			      "block": "[Block GitHub Actions CI]",
			      "props": {
			        "jobs": [
			          {
			            "name": "Lint Knip",
			            "steps": [
			              {
			                "run": "pnpm lint:knip",
			              },
			            ],
			          },
			          {
			            "name": "Lint Knip Production",
			            "steps": [
			              {
			                "run": "pnpm lint:knip:production",
			              },
			            ],
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block Package JSON]",
			      "props": {
			        "properties": {
			          "devDependencies": {
			            "knip": "0.0.0-mock",
			          },
			          "scripts": {
			            "lint:knip": "knip",
			            "lint:knip:production": "knip --production",
			          },
			        },
			      },
			    },
			    {
			      "block": "[Block Remove Files]",
			      "props": {
			        "files": [
			          ".ts-prunerc*",
			          ".knip*",
			          "knip.{cjs,js,mjs}",
			          "knip.config.{c,j,m}*",
			          "knip.json*",
			        ],
			      },
			    },
			    {
			      "block": "[Block VS Code]",
			      "props": {
			        "extensions": [
			          "webpro.vscode-knip",
			        ],
			      },
			    },
			    {
			      "block": "[Block Remove Workflows]",
			      "props": {
			        "workflows": [
			          "knip",
			          "lint-knip",
			        ],
			      },
			    },
			  ],
			  "files": {
			    "knip.config.ts": [
			      "import type { KnipConfig } from "knip";

			export default {
				ignoreExportsUsedInFile: { interface: true, type: true },
				treatConfigHintsAsErrors: true,
			} satisfies KnipConfig;
			",
			      {
			        "previously": [
			          "knip.json",
			        ],
			      },
			    ],
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

		it("returns ignore when knip.config.ts exists and contains ignore", () => {
			const ignore = ["src/fixtures/**"];

			const actual = testIntake(blockKnip, {
				files: {
					"knip.config.ts": [
						`export default { ignore: ${JSON.stringify(ignore)} };`,
					],
				},
			});

			expect(actual).toEqual({ ignore });
		});

		it("returns ignore when knip.json exists and contains ignore", () => {
			const ignore = ["src/fixtures/**"];

			const actual = testIntake(blockKnip, {
				files: {
					"knip.json": [JSON.stringify({ ignore })],
				},
			});

			expect(actual).toEqual({ ignore });
		});

		it("keeps a src/index.ts entry when package.json has no built index.js entry point", () => {
			const entry = ["src/**/*.test.*", "src/index.ts"];

			const actual = testIntake(blockKnip, {
				files: {
					"knip.json": [JSON.stringify({ entry })],
					"package.json": [JSON.stringify({ main: "./lib/other.js" })],
				},
			});

			expect(actual).toEqual({ entry });
		});

		it("removes a src/index.ts entry when package.json main is a built index.js", () => {
			const actual = testIntake(blockKnip, {
				files: {
					"knip.json": [
						JSON.stringify({ entry: ["src/**/*.test.*", "src/index.ts"] }),
					],
					"package.json": [JSON.stringify({ main: "lib/index.js" })],
				},
			});

			expect(actual).toEqual({ entry: ["src/**/*.test.*"] });
		});

		it("removes a src/index.ts entry when package.json exports is a built index.js", () => {
			const actual = testIntake(blockKnip, {
				files: {
					"knip.config.ts": [
						`export default { entry: ["src/index.ts", "src/**/*.test.*"] };`,
					],
					"package.json": [
						JSON.stringify({ exports: { ".": "./dist/index.js" } }),
					],
				},
			});

			expect(actual).toEqual({ entry: ["src/**/*.test.*"] });
		});

		it("removes entry when its only pattern is a redundant src/index.ts", () => {
			const actual = testIntake(blockKnip, {
				files: {
					"knip.json": [JSON.stringify({ entry: ["src/index.ts"] })],
					"package.json": [JSON.stringify({ exports: "./dist/index.js" })],
				},
			});

			expect(actual).toBeUndefined();
		});
	});
});
