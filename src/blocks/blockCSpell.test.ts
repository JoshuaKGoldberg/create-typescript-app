import { testBlock, testIntake } from "bingo-stratum-testers";
import { describe, expect, it, test, vi } from "vitest";

import { blockCSpell } from "./blockCSpell.ts";
import { optionsBase } from "./options.fakes.ts";

vi.mock("../data/packageData.ts", () => ({
	getPackageDependencies: (...names: string[]) =>
		Object.fromEntries(names.map((name) => [name, "0.0.0-mock"])),
}));

vi.mock("../utils/resolveBin.ts", () => ({
	resolveBin: (bin: string) => `path/to/${bin}`,
}));

describe(blockCSpell, () => {
	test("without addons or options", () => {
		const creation = testBlock(blockCSpell, {
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
			                "- \`pnpm lint:spelling\` ([cspell](https://cspell.org)): Spell checks across all source files",
			              ],
			            },
			          },
			        },
			      },
			      "block": "[Block Development Docs]",
			    },
			    {
			      "addons": {
			        "extensions": [
			          "streetsidesoftware.code-spell-checker",
			        ],
			      },
			      "block": "[Block VS Code]",
			    },
			    {
			      "addons": {
			        "jobs": [
			          {
			            "name": "Lint Spelling",
			            "steps": [
			              {
			                "run": "pnpm lint:spelling",
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
			            "cspell": "0.0.0-mock",
			          },
			          "scripts": {
			            "lint:spelling": "cspell "**" ".github/**/*"",
			          },
			        },
			      },
			      "block": "[Block Package JSON]",
			    },
			  ],
			  "files": {
			    "cspell.json": "{"dictionaries":["npm","node","typescript"],"ignorePaths":[".github","CHANGELOG.md","dist","node_modules","pnpm-lock.yaml"]}",
			  },
			}
		`);
	});

	test("with addons", () => {
		const creation = testBlock(blockCSpell, {
			addons: {
				ignorePaths: ["lib/"],
				words: ["joshuakgoldberg"],
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
			                "- \`pnpm lint:spelling\` ([cspell](https://cspell.org)): Spell checks across all source files",
			              ],
			            },
			          },
			        },
			      },
			      "block": "[Block Development Docs]",
			    },
			    {
			      "addons": {
			        "extensions": [
			          "streetsidesoftware.code-spell-checker",
			        ],
			      },
			      "block": "[Block VS Code]",
			    },
			    {
			      "addons": {
			        "jobs": [
			          {
			            "name": "Lint Spelling",
			            "steps": [
			              {
			                "run": "pnpm lint:spelling",
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
			            "cspell": "0.0.0-mock",
			          },
			          "scripts": {
			            "lint:spelling": "cspell "**" ".github/**/*"",
			          },
			        },
			      },
			      "block": "[Block Package JSON]",
			    },
			  ],
			  "files": {
			    "cspell.json": "{"dictionaries":["npm","node","typescript"],"ignorePaths":[".github","CHANGELOG.md","dist","lib/","node_modules","pnpm-lock.yaml"],"words":["joshuakgoldberg"]}",
			  },
			}
		`);
	});

	test("with options", () => {
		const creation = testBlock(blockCSpell, {
			options: {
				...optionsBase,
				words: ["joshuakgoldberg"],
			},
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
			                "- \`pnpm lint:spelling\` ([cspell](https://cspell.org)): Spell checks across all source files",
			              ],
			            },
			          },
			        },
			      },
			      "block": "[Block Development Docs]",
			    },
			    {
			      "addons": {
			        "extensions": [
			          "streetsidesoftware.code-spell-checker",
			        ],
			      },
			      "block": "[Block VS Code]",
			    },
			    {
			      "addons": {
			        "jobs": [
			          {
			            "name": "Lint Spelling",
			            "steps": [
			              {
			                "run": "pnpm lint:spelling",
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
			            "cspell": "0.0.0-mock",
			          },
			          "scripts": {
			            "lint:spelling": "cspell "**" ".github/**/*"",
			          },
			        },
			      },
			      "block": "[Block Package JSON]",
			    },
			  ],
			  "files": {
			    "cspell.json": "{"dictionaries":["npm","node","typescript"],"ignorePaths":[".github","CHANGELOG.md","dist","node_modules","pnpm-lock.yaml"],"words":["joshuakgoldberg"]}",
			  },
			}
		`);
	});

	test("setup mode", () => {
		const creation = testBlock(blockCSpell, {
			mode: "setup",
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
			                "- \`pnpm lint:spelling\` ([cspell](https://cspell.org)): Spell checks across all source files",
			              ],
			            },
			          },
			        },
			      },
			      "block": "[Block Development Docs]",
			    },
			    {
			      "addons": {
			        "extensions": [
			          "streetsidesoftware.code-spell-checker",
			        ],
			      },
			      "block": "[Block VS Code]",
			    },
			    {
			      "addons": {
			        "jobs": [
			          {
			            "name": "Lint Spelling",
			            "steps": [
			              {
			                "run": "pnpm lint:spelling",
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
			            "cspell": "0.0.0-mock",
			          },
			          "scripts": {
			            "lint:spelling": "cspell "**" ".github/**/*"",
			          },
			        },
			      },
			      "block": "[Block Package JSON]",
			    },
			  ],
			  "files": {
			    "cspell.json": "{"dictionaries":["npm","node","typescript"],"ignorePaths":[".github","CHANGELOG.md","dist","node_modules","pnpm-lock.yaml"]}",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "node path/to/cspell-populate-words/bin/index.mjs --words "access" --words "public" --words "description" --words "Test description" --words "directory" --words "." --words "documentation" --words "readme" --words "usage" --words "Test usage." --words "email" --words "github" --words "github@email.com" --words "npm" --words "npm@email.com" --words "emoji" --words "💖" --words "node" --words "minimum" --words "20.12.0" --words "owner" --words "test-owner" --words "preset" --words "minimal" --words "repository" --words "test-repository" --words "title" --words "Test Title"",
			      ],
			      "phase": 3,
			    },
			  ],
			}
		`);
	});

	test("transition mode", () => {
		const creation = testBlock(blockCSpell, {
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
			                "- \`pnpm lint:spelling\` ([cspell](https://cspell.org)): Spell checks across all source files",
			              ],
			            },
			          },
			        },
			      },
			      "block": "[Block Development Docs]",
			    },
			    {
			      "addons": {
			        "extensions": [
			          "streetsidesoftware.code-spell-checker",
			        ],
			      },
			      "block": "[Block VS Code]",
			    },
			    {
			      "addons": {
			        "jobs": [
			          {
			            "name": "Lint Spelling",
			            "steps": [
			              {
			                "run": "pnpm lint:spelling",
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
			            "cspell": "0.0.0-mock",
			          },
			          "scripts": {
			            "lint:spelling": "cspell "**" ".github/**/*"",
			          },
			        },
			      },
			      "block": "[Block Package JSON]",
			    },
			    {
			      "addons": {
			        "workflows": [
			          "lint-spelling",
			          "spelling",
			        ],
			      },
			      "block": "[Block Remove Workflows]",
			    },
			  ],
			  "files": {
			    "cspell.json": "{"dictionaries":["npm","node","typescript"],"ignorePaths":[".github","CHANGELOG.md","dist","node_modules","pnpm-lock.yaml"]}",
			  },
			}
		`);
	});

	describe("intake", () => {
		it("returns undefined when cspell.json does not exist", () => {
			const actual = testIntake(blockCSpell, {
				files: {},
			});

			expect(actual).toBeUndefined();
		});

		it("returns undefined when cspell.json does not contain truthy data", () => {
			const actual = testIntake(blockCSpell, {
				files: {
					"cspell.json": [JSON.stringify(null)],
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns undefined when cspell.json contains invalid data", () => {
			const actual = testIntake(blockCSpell, {
				files: {
					"cspell.json": [JSON.stringify({ ignorePaths: true })],
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns the data when cspell.json contains ignorePaths and words", () => {
			const data = {
				ignorePaths: ["other"],
				words: ["abc", "def"],
			};

			const actual = testIntake(blockCSpell, {
				files: {
					"cspell.json": [JSON.stringify(data)],
				},
			});

			expect(actual).toEqual(data);
		});
	});
});
