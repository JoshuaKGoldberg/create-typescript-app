import { testBlock } from "create-testers";
import { describe, expect, test } from "vitest";

import { blockMarkdownlint } from "./blockMarkdownlint.js";
import { optionsBase } from "./options.fakes.js";

describe("blockMarkdownlint", () => {
	test("without addons", () => {
		const creation = testBlock(blockMarkdownlint, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "words": [
			          "markdownlintignore",
			        ],
			      },
			      "block": [Function],
			    },
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
			            "markdownlint": "0.37.2",
			            "markdownlint-cli": "0.43.0",
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
			    ".markdownlintignore": ".github/CODE_OF_CONDUCT.md
			CHANGELOG.md
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
			        "words": [
			          "markdownlintignore",
			        ],
			      },
			      "block": [Function],
			    },
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
			            "markdownlint": "0.37.2",
			            "markdownlint-cli": "0.43.0",
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
			    ".markdownlintignore": ".github/CODE_OF_CONDUCT.md
			CHANGELOG.md
			lib/
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
});
