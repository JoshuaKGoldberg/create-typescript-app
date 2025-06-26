import { testBlock, testIntake } from "bingo-stratum-testers";
import { describe, expect, it, test, vi } from "vitest";

import { blockCSpell } from "./blockCSpell.js";
import { optionsBase } from "./options.fakes.js";

vi.mock("../utils/resolveBin.js", () => ({
	resolveBin: (bin: string) => `path/to/${bin}`,
}));

describe("blockCSpell", () => {
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "extensions": [
			          "streetsidesoftware.code-spell-checker",
			        ],
			      },
			      "block": [Function],
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "cspell": "9.1.2",
			          },
			          "scripts": {
			            "lint:spelling": "cspell "**" ".github/**/*"",
			          },
			        },
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "cspell.json": "{"dictionaries":["npm","node","typescript"],"ignorePaths":[".github","CHANGELOG.md","lib","node_modules","pnpm-lock.yaml"]}",
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "extensions": [
			          "streetsidesoftware.code-spell-checker",
			        ],
			      },
			      "block": [Function],
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "cspell": "9.1.2",
			          },
			          "scripts": {
			            "lint:spelling": "cspell "**" ".github/**/*"",
			          },
			        },
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "cspell.json": "{"dictionaries":["npm","node","typescript"],"ignorePaths":[".github","CHANGELOG.md","lib","lib/","node_modules","pnpm-lock.yaml"],"words":["joshuakgoldberg"]}",
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "extensions": [
			          "streetsidesoftware.code-spell-checker",
			        ],
			      },
			      "block": [Function],
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "cspell": "9.1.2",
			          },
			          "scripts": {
			            "lint:spelling": "cspell "**" ".github/**/*"",
			          },
			        },
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "cspell.json": "{"dictionaries":["npm","node","typescript"],"ignorePaths":[".github","CHANGELOG.md","lib","node_modules","pnpm-lock.yaml"],"words":["joshuakgoldberg"]}",
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "extensions": [
			          "streetsidesoftware.code-spell-checker",
			        ],
			      },
			      "block": [Function],
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "cspell": "9.1.2",
			          },
			          "scripts": {
			            "lint:spelling": "cspell "**" ".github/**/*"",
			          },
			        },
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "cspell.json": "{"dictionaries":["npm","node","typescript"],"ignorePaths":[".github","CHANGELOG.md","lib","node_modules","pnpm-lock.yaml"]}",
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "extensions": [
			          "streetsidesoftware.code-spell-checker",
			        ],
			      },
			      "block": [Function],
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "cspell": "9.1.2",
			          },
			          "scripts": {
			            "lint:spelling": "cspell "**" ".github/**/*"",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "workflows": [
			          "lint-spelling",
			          "spelling",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "cspell.json": "{"dictionaries":["npm","node","typescript"],"ignorePaths":[".github","CHANGELOG.md","lib","node_modules","pnpm-lock.yaml"]}",
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
