import { testBlock, testIntake } from "bingo-stratum-testers";
import { describe, expect, it, test } from "vitest";

import { blockMarkdownlint } from "./blockMarkdownlint.js";
import { optionsBase } from "./options.fakes.js";

describe("blockMarkdownlint", () => {
	test("without addons or mode", () => {
		const creation = testBlock(blockMarkdownlint, {
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
			                "- \`pnpm lint:md\` ([Markdownlint](https://github.com/DavidAnson/markdownlint)): Checks Markdown source files",
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
			            "name": "Lint Markdown",
			            "steps": [
			              {
			                "run": "pnpm lint:md",
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
			            "markdownlint": "0.38.0",
			            "markdownlint-cli": "0.45.0",
			            "sentences-per-line": "0.3.0",
			          },
			          "scripts": {
			            "lint:md": "markdownlint "**/*.md" ".github/**/*.md" --rules sentences-per-line",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "extensions": [
			          "DavidAnson.vscode-markdownlint",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    ".markdownlint.json": "{"extends":"markdownlint/style/prettier","first-line-h1":false,"no-inline-html":false}",
			    ".markdownlintignore": "node_modules/
			",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm lint:md --fix",
			      ],
			      "phase": 3,
			    },
			  ],
			}
		`);
	});

	test("with addons", () => {
		const creation = testBlock(blockMarkdownlint, {
			addons: {
				ignores: ["lib/"],
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
			                "- \`pnpm lint:md\` ([Markdownlint](https://github.com/DavidAnson/markdownlint)): Checks Markdown source files",
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
			            "name": "Lint Markdown",
			            "steps": [
			              {
			                "run": "pnpm lint:md",
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
			            "markdownlint": "0.38.0",
			            "markdownlint-cli": "0.45.0",
			            "sentences-per-line": "0.3.0",
			          },
			          "scripts": {
			            "lint:md": "markdownlint "**/*.md" ".github/**/*.md" --rules sentences-per-line",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "extensions": [
			          "DavidAnson.vscode-markdownlint",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    ".markdownlint.json": "{"extends":"markdownlint/style/prettier","first-line-h1":false,"no-inline-html":false}",
			    ".markdownlintignore": "lib/
			node_modules/
			",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm lint:md --fix",
			      ],
			      "phase": 3,
			    },
			  ],
			}
		`);
	});

	test("transition mode", () => {
		const creation = testBlock(blockMarkdownlint, {
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
			                "- \`pnpm lint:md\` ([Markdownlint](https://github.com/DavidAnson/markdownlint)): Checks Markdown source files",
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
			            "name": "Lint Markdown",
			            "steps": [
			              {
			                "run": "pnpm lint:md",
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
			            "markdownlint": "0.38.0",
			            "markdownlint-cli": "0.45.0",
			            "sentences-per-line": "0.3.0",
			          },
			          "scripts": {
			            "lint:md": "markdownlint "**/*.md" ".github/**/*.md" --rules sentences-per-line",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "extensions": [
			          "DavidAnson.vscode-markdownlint",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "workflows": [
			          "lint-md",
			          "lint-markdown",
			          "lint-markdownlint",
			          "markdownlint",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    ".markdownlint.json": "{"extends":"markdownlint/style/prettier","first-line-h1":false,"no-inline-html":false}",
			    ".markdownlintignore": "node_modules/
			",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm lint:md --fix",
			      ],
			      "phase": 3,
			    },
			  ],
			}
		`);
	});

	describe("intake", () => {
		it("returns undefined when .markdownlintignore does not exist", () => {
			const actual = testIntake(blockMarkdownlint, {
				files: {},
			});

			expect(actual).toBeUndefined();
		});

		it("returns no ignores when .markdownlintignore does not contain truthy lines", () => {
			const actual = testIntake(blockMarkdownlint, {
				files: {
					".markdownlintignore": ["\n"],
				},
			});

			expect(actual).toEqual({ ignores: [] });
		});

		it("returns ignores when .markdownlintignore contains lines", () => {
			const ignores = ["abc", "def"];

			const actual = testIntake(blockMarkdownlint, {
				files: {
					".markdownlintignore": [ignores.join("\n") + "\n"],
				},
			});

			expect(actual).toEqual({ ignores });
		});
	});
});
