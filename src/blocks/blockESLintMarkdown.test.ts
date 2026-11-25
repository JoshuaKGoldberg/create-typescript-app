import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockESLintMarkdown } from "./blockESLintMarkdown.ts";
import { optionsBase } from "./options.fakes.ts";

describe(blockESLintMarkdown, () => {
	test("production", () => {
		const creation = testBlock(blockESLintMarkdown, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block ESLint]",
			      "props": {
			        "extensions": [
			          {
			            "extends": [
			              "markdown.configs.recommended",
			            ],
			            "files": [
			              "**/*.md",
			            ],
			            "rules": [
			              {
			                "comment": "https://github.com/eslint/markdown/issues/294",
			                "entries": {
			                  "markdown/no-missing-label-refs": "off",
			                },
			              },
			            ],
			          },
			        ],
			        "imports": [
			          {
			            "source": "@eslint/markdown",
			            "specifier": "markdown",
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block Remove Dependencies]",
			      "props": {
			        "dependencies": [
			          "@types/eslint-plugin-markdown",
			          "eslint-plugin-markdown",
			          "markdownlint",
			          "markdownlint-cli",
			          "markdownlint-sentences-per-line",
			          "sentences-per-line",
			        ],
			      },
			    },
			    {
			      "block": "[Block Remove Files]",
			      "props": {
			        "files": [
			          ".markdownlint*",
			          ".markdownlintignore",
			        ],
			      },
			    },
			    {
			      "block": "[Block Remove Workflows]",
			      "props": {
			        "workflows": [
			          "lint-markdown",
			          "lint-md",
			          "lint_markdown",
			          "lint_md",
			        ],
			      },
			    },
			  ],
			}
		`);
	});

	test("transition mode with a non-Markdownlint lint:md script", () => {
		const creation = testBlock(blockESLintMarkdown, {
			mode: "transition",
			options: {
				...optionsBase,
				packageData: {
					scripts: {
						"lint:md": "my-markdown-linter",
					},
				},
			},
		});

		expect(creation.extensions).not.toContainEqual(
			expect.objectContaining({ block: "[Block Package JSON]" }),
		);
	});

	test("transition mode with a Markdownlint lint:md script", () => {
		const creation = testBlock(blockESLintMarkdown, {
			mode: "transition",
			options: {
				...optionsBase,
				packageData: {
					scripts: {
						"lint:md":
							'markdownlint "**/*.md" ".github/**/*.md" --rules sentences-per-line',
					},
				},
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block ESLint]",
			      "props": {
			        "extensions": [
			          {
			            "extends": [
			              "markdown.configs.recommended",
			            ],
			            "files": [
			              "**/*.md",
			            ],
			            "rules": [
			              {
			                "comment": "https://github.com/eslint/markdown/issues/294",
			                "entries": {
			                  "markdown/no-missing-label-refs": "off",
			                },
			              },
			            ],
			          },
			        ],
			        "imports": [
			          {
			            "source": "@eslint/markdown",
			            "specifier": "markdown",
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block Remove Dependencies]",
			      "props": {
			        "dependencies": [
			          "@types/eslint-plugin-markdown",
			          "eslint-plugin-markdown",
			          "markdownlint",
			          "markdownlint-cli",
			          "markdownlint-sentences-per-line",
			          "sentences-per-line",
			        ],
			      },
			    },
			    {
			      "block": "[Block Remove Files]",
			      "props": {
			        "files": [
			          ".markdownlint*",
			          ".markdownlintignore",
			        ],
			      },
			    },
			    {
			      "block": "[Block Remove Workflows]",
			      "props": {
			        "workflows": [
			          "lint-markdown",
			          "lint-md",
			          "lint_markdown",
			          "lint_md",
			        ],
			      },
			    },
			    {
			      "block": "[Block CSpell]",
			      "props": {
			        "wordRemovals": [
			          "markdownlintignore",
			        ],
			      },
			    },
			    {
			      "block": "[Block Package JSON]",
			      "props": {
			        "properties": {
			          "scripts": {
			            "lint:md": undefined,
			          },
			        },
			      },
			    },
			  ],
			}
		`);
	});
});
