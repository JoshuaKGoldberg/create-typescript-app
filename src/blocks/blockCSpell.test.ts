import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test, vi } from "vitest";

import { blockCSpell } from "./blockCSpell.js";
import { optionsBase } from "./options.fakes.js";

vi.mock("../utils/resolveBin.js", () => ({
	resolveBin: (bin: string) => `path/to/${bin}`,
}));

describe("blockCSpell", () => {
	test("without addons", () => {
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
			        "removedWorkflows": [
			          "lint-spelling",
			          "spelling",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "cspell": "8.17.5",
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
				ignores: ["lib/"],
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
			        "removedWorkflows": [
			          "lint-spelling",
			          "spelling",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "cspell": "8.17.5",
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
			        "removedWorkflows": [
			          "lint-spelling",
			          "spelling",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "cspell": "8.17.5",
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
			        "node path/to/cspell-populate-words/bin/index.mjs --words "access" --words "public" --words "description" --words "Test description" --words "directory" --words "." --words "email" --words "github" --words "github@email.com" --words "npm" --words "npm@email.com" --words "emoji" --words "💖" --words "owner" --words "test-owner" --words "repository" --words "test-repository" --words "title" --words "Test Title"",
			      ],
			      "phase": 3,
			    },
			  ],
			}
		`);
	});
});
