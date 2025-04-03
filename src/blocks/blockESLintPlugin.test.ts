import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockESLintPlugin } from "./blockESLintPlugin.js";
import { optionsBase } from "./options.fakes.js";

describe("blockESLintPlugin", () => {
	test("production", () => {
		const creation = testBlock(blockESLintPlugin, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "words": [
			          "eslint-doc-generatorrc.js",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "sections": {
			          "Building": {
			            "innerSections": [
			              {
			                "contents": "
			Run [\`eslint-doc-generator\`](https://github.com/bmish/eslint-doc-generator) to generate Markdown files documenting rules.

			\`\`\`shell
			pnpm build:docs
			\`\`\`
					",
			                "heading": "Building Docs",
			              },
			            ],
			          },
			          "Linting": {
			            "contents": {
			              "items": [
			                "- \`pnpm lint:docs\` ([eslint-doc-generator](https://github.com/bmish/eslint-doc-generator)): Generates and validates documentation for ESLint rules",
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
			          "eslintPlugin.configs["flat/recommended"]",
			        ],
			        "ignores": [
			          ".eslint-doc-generatorrc.js",
			          "docs/rules/*/*.ts",
			        ],
			        "imports": [
			          {
			            "source": {
			              "packageName": "eslint-plugin-eslint-plugin",
			              "version": "6.4.0",
			            },
			            "specifier": "eslintPlugin",
			          },
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "jobs": [
			          {
			            "name": "Lint Docs",
			            "steps": [
			              {
			                "run": "pnpm build || exit 0",
			              },
			              {
			                "run": "pnpm lint:docs",
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
			            "eslint-doc-generator": "2.1.0",
			            "eslint-plugin-eslint-plugin": "6.4.0",
			          },
			          "peerDependencies": {
			            "@typescript-eslint/parser": ">=8",
			            "eslint": ">=9",
			            "typescript": ">=5",
			          },
			          "scripts": {
			            "build:docs": "eslint-doc-generator",
			            "lint:docs": "eslint-doc-generator --check",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "coverage": {
			          "exclude": [
			            "src/index.ts",
			            "src/rules/index.ts",
			          ],
			        },
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    ".eslint-doc-generatorrc.js": "import prettier from "prettier";

			/** @type {import('eslint-doc-generator').GenerateOptions} */
			const config = {
				postprocess: async (content, path) =>
					prettier.format(content, {
						...(await prettier.resolveConfig(path)),
						parser: "markdown",
					}),
				ruleDocTitleFormat: "prefix-name",
			};

			export default config;
			",
			  },
			}
		`);
	});
});
