import { testBlock, testIntake } from "bingo-stratum-testers";
import { describe, expect, it, test } from "vitest";

import { blockESLintPlugin } from "./blockESLintPlugin.js";
import { optionsBase } from "./options.fakes.js";

describe("blockESLintPlugin", () => {
	test("without addons, mode, or options", () => {
		const creation = testBlock(blockESLintPlugin, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "words": [
			          "eslint-doc-generatorrc",
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
			          "scripts": {
			            "build:docs": "pnpm build --no-dts && eslint-doc-generator",
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
				ruleDocTitleFormat: "name",
			};

			export default config;
			",
			  },
			}
		`);
	});

	test("with options.type set to commonjs", () => {
		const creation = testBlock(blockESLintPlugin, {
			options: {
				...optionsBase,
				type: "commonjs",
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "words": [
			          "eslint-doc-generatorrc",
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
			          ".eslint-doc-generatorrc.mjs",
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
			          "scripts": {
			            "build:docs": "pnpm build --no-dts && eslint-doc-generator",
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
			    ".eslint-doc-generatorrc.mjs": "import prettier from "prettier";

			/** @type {import('eslint-doc-generator').GenerateOptions} */
			const config = {
				postprocess: async (content, path) =>
					prettier.format(content, {
						...(await prettier.resolveConfig(path)),
						parser: "markdown",
					}),
				ruleDocTitleFormat: "name",
			};

			export default config;
			",
			  },
			}
		`);
	});

	test("setup mode", () => {
		const creation = testBlock(blockESLintPlugin, {
			mode: "setup",
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "words": [
			          "eslint-doc-generatorrc",
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
			          "scripts": {
			            "build:docs": "pnpm build --no-dts && eslint-doc-generator",
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
				ruleDocTitleFormat: "name",
			};

			export default config;
			",
			    "src": {
			      "index.ts": "import Module from "node:module";

			import { rules } from "./rules/index.js";

			const require = Module.createRequire(import.meta.url);

			const { name, version } =
				// \`import\`ing here would bypass the TSConfig's \`"rootDir": "src"\`
				require("../package.json") as typeof import("../package.json");

			export const plugin = {
				configs: {
					get recommended() {
						return recommended;
					},
				},
				meta: { name, version },
				rules,
			};

			const recommended = {
				plugins: {
					"test-repository": plugin,
				},
				rules: Object.fromEntries(
					Object.keys(rules).map((rule) => [\`test-repository/\${rule}\`, "error"]),
				),
			};

			export { rules };

			export default plugin;
			",
			      "rules": {
			        "example.test.ts": "import { rule } from "./enums.js";
			import { ruleTester } from "./ruleTester.js";

			ruleTester.run("enums", rule, {
				invalid: [
					{
						code: \`enum Values {}\`,
						errors: [
							{
								column: 1,
								endColumn: 15,
								endLine: 1,
								line: 1,
								messageId: "enum",
							},
						],
					},
				],
				valid: [\`const Values = {};\`, \`const Values = {} as const;\`],
			});
			",
			        "example.ts": "import { createRule } from "../utils.js";

			export const rule = createRule({
				create(context) {
					return {
						TSEnumDeclaration(node) {
							context.report({
								messageId: "enum",
								node,
							});
						},
					};
				},
				defaultOptions: [],
				meta: {
					docs: {
						description: "Avoid using TypeScript's enums.",
					},
					messages: {
						enum: "This enum will not be allowed under TypeScript's --erasableSyntaxOnly.",
					},
					schema: [],
					type: "problem",
				},
				name: "enums",
			});
			",
			        "index.ts": "import { rule as example } from "./example.js";

			export const rules = {
				example,
			};
			",
			        "ruleTester.ts": "import { RuleTester } from "@typescript-eslint/rule-tester";
			import * as vitest from "vitest";

			RuleTester.afterAll = vitest.afterAll;
			RuleTester.it = vitest.it;
			RuleTester.itOnly = vitest.it.only;
			RuleTester.describe = vitest.describe;

			export const ruleTester = new RuleTester();
			",
			      },
			      "utils.ts": "import { ESLintUtils } from "@typescript-eslint/utils";

			export const createRule = ESLintUtils.RuleCreator(
				(name) =>
					\`https://github.com/test-owner/test-repository/blob/main/docs/rules/\${name}.md\`,
			);
			",
			    },
			  },
			}
		`);
	});

	test("addons", () => {
		const creation = testBlock(blockESLintPlugin, {
			addons: {
				configEmoji: [
					["recommended", "✅"],
					["legacy-recommended", "✔️"],
				],
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "words": [
			          "eslint-doc-generatorrc",
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
			          "scripts": {
			            "build:docs": "pnpm build --no-dts && eslint-doc-generator",
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
				configEmoji: [["recommended","✅"],["legacy-recommended","✔️"]],
				postprocess: async (content, path) =>
					prettier.format(content, {
						...(await prettier.resolveConfig(path)),
						parser: "markdown",
					}),
				ruleDocTitleFormat: "name",
			};

			export default config;
			",
			  },
			}
		`);
	});

	describe("intake", () => {
		it("returns nothing when .eslint-doc-generatorrc.js and .eslint-doc-generatorrc.mjs do not exist", () => {
			const actual = testIntake(blockESLintPlugin, {
				files: {},
				options: optionsBase,
			});

			expect(actual).toEqual(undefined);
		});

		it("returns nothing when .eslint-doc-generatorrc.js does not have a to const config =", () => {
			const actual = testIntake(blockESLintPlugin, {
				files: {
					".eslint-doc-generatorrc.js": [`const other = {};`],
				},
				options: optionsBase,
			});

			expect(actual).toEqual(undefined);
		});

		it("returns nothing when .eslint-doc-generatorrc.js passes nothing to config =", () => {
			const actual = testIntake(blockESLintPlugin, {
				files: {
					".eslint-doc-generatorrc.js": [`const config = {};`],
				},
				options: optionsBase,
			});

			expect(actual).toEqual(undefined);
		});

		it("returns nothing when .eslint-doc-generatorrc.js passes invalid syntax to config =", () => {
			const actual = testIntake(blockESLintPlugin, {
				files: {
					".eslint-doc-generatorrc.js": [`const config = { ! }`],
				},
				options: optionsBase,
			});

			expect(actual).toEqual(undefined);
		});

		it("returns nothing when .eslint-doc-generatorrc.js passes unrelated properties to config =", () => {
			const actual = testIntake(blockESLintPlugin, {
				files: {
					".eslint-doc-generatorrc.js": [`const config = { other: true }`],
				},
				options: optionsBase,
			});

			expect(actual).toEqual(undefined);
		});

		it("returns configEmoji when it exists alone in .eslint-doc-generatorrc.js", () => {
			const actual = testIntake(blockESLintPlugin, {
				files: {
					".eslint-doc-generatorrc.js": [
						`const config = { configEmoji: [["recommended", "✅"]] }`,
					],
				},
				options: optionsBase,
			});

			expect(actual).toEqual({
				configEmoji: [["recommended", "✅"]],
			});
		});
	});

	it("returns configEmoji when it exists alone in .eslint-doc-generatorrc.mjs", () => {
		const actual = testIntake(blockESLintPlugin, {
			files: {
				".eslint-doc-generatorrc.mjs": [
					`const config = { configEmoji: [["recommended", "✅"]] }`,
				],
			},
			options: optionsBase,
		});

		expect(actual).toEqual({
			configEmoji: [["recommended", "✅"]],
		});
	});

	it("returns configEmoji when it exists with other data in .eslint-doc-generatorrc.js", () => {
		const actual = testIntake(blockESLintPlugin, {
			files: {
				".eslint-doc-generatorrc.js": [
					`const config = { configEmoji: [["recommended", "✅"]], other: true }`,
				],
			},
			options: optionsBase,
		});

		expect(actual).toEqual({
			configEmoji: [["recommended", "✅"]],
		});
	});

	it("returns configEmoji when it exists with other, non-JSON5 data in a full .eslint-doc-generatorrc.js", () => {
		const actual = testIntake(blockESLintPlugin, {
			files: {
				".eslint-doc-generatorrc.js": [
					`import prettier from "prettier";

/** @type {import('eslint-doc-generator').GenerateOptions} */
const config = {
	configEmoji: [
		["recommended", "✅"],
		["legacy-recommended", "✔️"],
	],
	postprocess: async (content, path) =>
		prettier.format(content, {
			...(await prettier.resolveConfig(path)),
			parser: "markdown",
		}),
	ruleDocTitleFormat: "name",
};

export default config;
`,
				],
			},
			options: optionsBase,
		});

		expect(actual).toEqual({
			configEmoji: [
				["recommended", "✅"],
				["legacy-recommended", "✔️"],
			],
		});
	});
});
