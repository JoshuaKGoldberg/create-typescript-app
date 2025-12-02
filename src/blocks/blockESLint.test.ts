import { testBlock, testIntake } from "bingo-stratum-testers";
import { describe, expect, it, test, vi } from "vitest";

import { blockESLint } from "./blockESLint.js";
import { optionsBase } from "./options.fakes.js";

const mockIntakeData = { ignores: ["lib"] };

const mockBlockESLintIntake = vi.fn().mockReturnValue(mockIntakeData);

vi.mock("./eslint/blockESLintIntake.js", () => ({
	get blockESLintIntake() {
		return mockBlockESLintIntake;
	},
}));

describe("blockESLint", () => {
	test("without addons or mode", () => {
		const creation = testBlock(blockESLint, {
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
			              "after": [
			                "
			For example, ESLint can be run with \`--fix\` to auto-fix some lint rule complaints:

			\`\`\`shell
			pnpm run lint --fix
			\`\`\`
			",
			              ],
			              "before": "
			This package includes several forms of linting to enforce consistent code quality and styling.
			Each should be shown in VS Code, and can be run manually on the command-line:
			",
			              "items": [
			                "- \`pnpm lint\` ([ESLint](https://eslint.org) with [typescript-eslint](https://typescript-eslint.io)): Lints JavaScript and TypeScript source files",
			              ],
			              "plural": "Read the individual documentation for each linter to understand how it can be configured and used best.",
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
			            "name": "Lint",
			            "steps": [
			              {
			                "run": "pnpm lint",
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
			            "@eslint/js": "9.39.1",
			            "@types/node": "24.10.1",
			            "eslint": "9.39.1",
			            "typescript-eslint": "8.48.1",
			          },
			          "scripts": {
			            "lint": "eslint . --max-warnings 0",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "extensions": [
			          "dbaeumer.vscode-eslint",
			        ],
			        "settings": {
			          "editor.codeActionsOnSave": {
			            "source.fixAll.eslint": "explicit",
			          },
			          "eslint.probe": [
			            "javascript",
			            "javascriptreact",
			            "json",
			            "jsonc",
			            "markdown",
			            "typescript",
			            "typescriptreact",
			            "yaml",
			          ],
			          "eslint.rules.customizations": [
			            {
			              "rule": "*",
			              "severity": "warn",
			            },
			          ],
			        },
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "eslint.config.js": "import eslint from "@eslint/js";
			import { defineConfig } from "eslint/config";
			import tseslint from "typescript-eslint";

			export default defineConfig(
				{ ignores: ["lib", "node_modules", "pnpm-lock.yaml"] },
				{ linterOptions: { reportUnusedDisableDirectives: "error" } },
				{ extends: [eslint.configs.recommended, tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked], files: ["**/*.{js,ts}"], languageOptions: {"parserOptions":{"projectService":{"allowDefaultProject":["*.config.*s"]}}}, }
			);",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm lint --fix",
			      ],
			      "phase": 3,
			    },
			  ],
			}
		`);
	});

	test("transition mode", () => {
		const creation = testBlock(blockESLint, {
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
			              "after": [
			                "
			For example, ESLint can be run with \`--fix\` to auto-fix some lint rule complaints:

			\`\`\`shell
			pnpm run lint --fix
			\`\`\`
			",
			              ],
			              "before": "
			This package includes several forms of linting to enforce consistent code quality and styling.
			Each should be shown in VS Code, and can be run manually on the command-line:
			",
			              "items": [
			                "- \`pnpm lint\` ([ESLint](https://eslint.org) with [typescript-eslint](https://typescript-eslint.io)): Lints JavaScript and TypeScript source files",
			              ],
			              "plural": "Read the individual documentation for each linter to understand how it can be configured and used best.",
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
			            "name": "Lint",
			            "steps": [
			              {
			                "run": "pnpm lint",
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
			            "@eslint/js": "9.39.1",
			            "@types/node": "24.10.1",
			            "eslint": "9.39.1",
			            "typescript-eslint": "8.48.1",
			          },
			          "scripts": {
			            "lint": "eslint . --max-warnings 0",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "extensions": [
			          "dbaeumer.vscode-eslint",
			        ],
			        "settings": {
			          "editor.codeActionsOnSave": {
			            "source.fixAll.eslint": "explicit",
			          },
			          "eslint.probe": [
			            "javascript",
			            "javascriptreact",
			            "json",
			            "jsonc",
			            "markdown",
			            "typescript",
			            "typescriptreact",
			            "yaml",
			          ],
			          "eslint.rules.customizations": [
			            {
			              "rule": "*",
			              "severity": "warn",
			            },
			          ],
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "dependencies": [
			          "@types/eslint",
			          "@typescript-eslint/eslint-plugin",
			          "@typescript-eslint/parser",
			          "eslint-plugin-deprecation",
			          "eslint-plugin-eslint-comments",
			          "eslint-plugin-no-only-tests",
			          "yaml-eslint-parser",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "files": [
			          ".eslintrc*",
			          ".eslintignore",
			          "eslint.config.{cjs,mjs}",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "workflows": [
			          "eslint",
			          "lint",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "eslint.config.js": "import eslint from "@eslint/js";
			import { defineConfig } from "eslint/config";
			import tseslint from "typescript-eslint";

			export default defineConfig(
				{ ignores: ["lib", "node_modules", "pnpm-lock.yaml"] },
				{ linterOptions: { reportUnusedDisableDirectives: "error" } },
				{ extends: [eslint.configs.recommended, tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked], files: ["**/*.{js,ts}"], languageOptions: {"parserOptions":{"projectService":{"allowDefaultProject":["*.config.*s"]}}}, }
			);",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm lint --fix",
			      ],
			      "phase": 3,
			    },
			  ],
			}
		`);
	});

	test("transition mode with options.type set to commonjs", () => {
		const creation = testBlock(blockESLint, {
			mode: "transition",
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
			        "sections": {
			          "Linting": {
			            "contents": {
			              "after": [
			                "
			For example, ESLint can be run with \`--fix\` to auto-fix some lint rule complaints:

			\`\`\`shell
			pnpm run lint --fix
			\`\`\`
			",
			              ],
			              "before": "
			This package includes several forms of linting to enforce consistent code quality and styling.
			Each should be shown in VS Code, and can be run manually on the command-line:
			",
			              "items": [
			                "- \`pnpm lint\` ([ESLint](https://eslint.org) with [typescript-eslint](https://typescript-eslint.io)): Lints JavaScript and TypeScript source files",
			              ],
			              "plural": "Read the individual documentation for each linter to understand how it can be configured and used best.",
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
			            "name": "Lint",
			            "steps": [
			              {
			                "run": "pnpm lint",
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
			            "@eslint/js": "9.39.1",
			            "@types/node": "24.10.1",
			            "eslint": "9.39.1",
			            "typescript-eslint": "8.48.1",
			          },
			          "scripts": {
			            "lint": "eslint . --max-warnings 0",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "extensions": [
			          "dbaeumer.vscode-eslint",
			        ],
			        "settings": {
			          "editor.codeActionsOnSave": {
			            "source.fixAll.eslint": "explicit",
			          },
			          "eslint.probe": [
			            "javascript",
			            "javascriptreact",
			            "json",
			            "jsonc",
			            "markdown",
			            "typescript",
			            "typescriptreact",
			            "yaml",
			          ],
			          "eslint.rules.customizations": [
			            {
			              "rule": "*",
			              "severity": "warn",
			            },
			          ],
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "dependencies": [
			          "@types/eslint",
			          "@typescript-eslint/eslint-plugin",
			          "@typescript-eslint/parser",
			          "eslint-plugin-deprecation",
			          "eslint-plugin-eslint-comments",
			          "eslint-plugin-no-only-tests",
			          "yaml-eslint-parser",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "files": [
			          ".eslintrc*",
			          ".eslintignore",
			          "eslint.config.{cjs,js}",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "workflows": [
			          "eslint",
			          "lint",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "eslint.config.mjs": "import eslint from "@eslint/js";
			import { defineConfig } from "eslint/config";
			import tseslint from "typescript-eslint";

			export default defineConfig(
				{ ignores: ["lib", "node_modules", "pnpm-lock.yaml"] },
				{ linterOptions: { reportUnusedDisableDirectives: "error" } },
				{ files: ["*.mjs"], languageOptions: {"sourceType":"module"}, },{ extends: [eslint.configs.recommended, tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked], files: ["**/*.{js,mjs,ts}"], languageOptions: {"parserOptions":{"projectService":{"allowDefaultProject":["*.config.*s"]}}}, }
			);",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm lint --fix",
			      ],
			      "phase": 3,
			    },
			  ],
			}
		`);
	});

	test("with addons", () => {
		const creation = testBlock(blockESLint, {
			addons: {
				beforeLint: "Before lint.",
				explanations: ["This is a great config!", "You should use it!"],
				extensions: [
					{
						extends: ["a.configs.recommended"],
						files: ["**/*.a"],
						rules: {
							"a/b": "error",
							"a/c": ["error", { d: "e" }],
						},
					},
					{
						extends: ["b.configs.recommended"],
						files: ["**/*.b"],
						rules: {
							"b/c": "error",
							"b/d": ["error", { e: "f" }],
						},
						settings: {
							react: {
								version: "detect",
							},
						},
					},
				],
				ignores: ["generated"],
				imports: [
					{ source: "eslint-plugin-markdown", specifier: "a", types: true },
					{ source: "eslint-plugin-regexp", specifier: "b" },
					{
						source: { packageName: "eslint-plugin-unknown", version: "1.2.3" },
						specifier: "c",
					},
				],
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
			              "after": [
			                "
			For example, ESLint can be run with \`--fix\` to auto-fix some lint rule complaints:

			\`\`\`shell
			pnpm run lint --fix
			\`\`\`
			",
			                "Before lint.",
			              ],
			              "before": "
			This package includes several forms of linting to enforce consistent code quality and styling.
			Each should be shown in VS Code, and can be run manually on the command-line:
			",
			              "items": [
			                "- \`pnpm lint\` ([ESLint](https://eslint.org) with [typescript-eslint](https://typescript-eslint.io)): Lints JavaScript and TypeScript source files",
			              ],
			              "plural": "Read the individual documentation for each linter to understand how it can be configured and used best.",
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
			            "name": "Lint",
			            "steps": [
			              {
			                "run": "pnpm lint",
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
			            "@eslint/js": "9.39.1",
			            "@types/eslint-plugin-markdown": "2.0.2",
			            "@types/node": "24.10.1",
			            "eslint": "9.39.1",
			            "eslint-plugin-markdown": "5.1.0",
			            "eslint-plugin-regexp": "2.10.0",
			            "eslint-plugin-unknown": "1.2.3",
			            "typescript-eslint": "8.48.1",
			          },
			          "scripts": {
			            "lint": "eslint . --max-warnings 0",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "extensions": [
			          "dbaeumer.vscode-eslint",
			        ],
			        "settings": {
			          "editor.codeActionsOnSave": {
			            "source.fixAll.eslint": "explicit",
			          },
			          "eslint.probe": [
			            "javascript",
			            "javascriptreact",
			            "json",
			            "jsonc",
			            "markdown",
			            "typescript",
			            "typescriptreact",
			            "yaml",
			          ],
			          "eslint.rules.customizations": [
			            {
			              "rule": "*",
			              "severity": "warn",
			            },
			          ],
			        },
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "eslint.config.js": "/*
			This is a great config!
			*/
			/*
			You should use it!
			*/

			import eslint from "@eslint/js";
			import a from "eslint-plugin-markdown"
			import b from "eslint-plugin-regexp"
			import c from "eslint-plugin-unknown"
			import { defineConfig } from "eslint/config";
			import tseslint from "typescript-eslint";

			export default defineConfig(
				{ ignores: ["generated", "lib", "node_modules", "pnpm-lock.yaml"] },
				{ linterOptions: { reportUnusedDisableDirectives: "error" } },
				{ extends: [a.configs.recommended], files: ["**/*.a"], rules: {"a/b":"error","a/c":["error",{"d":"e"}]}, },{ extends: [b.configs.recommended], files: ["**/*.b"], rules: {"b/c":"error","b/d":["error",{"e":"f"}]}, settings: {"react":{"version":"detect"}}, },{ extends: [eslint.configs.recommended, tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked], files: ["**/*.{js,ts}"], languageOptions: {"parserOptions":{"projectService":{"allowDefaultProject":["*.config.*s"]}}}, }
			);",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm lint --fix",
			      ],
			      "phase": 3,
			    },
			  ],
			}
		`);
	});

	test("with identical addon rules comments across two extensions", () => {
		const creation = testBlock(blockESLint, {
			addons: {
				extensions: [
					{
						files: ["**/*.js"],
						rules: [
							{
								comment: "Duplicated comment",
								entries: { a: "error" },
							},
							{
								comment: "Standalone comment",
								entries: { b: "error" },
							},
							{
								comment: "Duplicated comment",
								entries: { c: "error" },
							},
						],
					},
					{
						files: ["**/*.js"],
						rules: [
							{
								comment: "Duplicated comment",
								entries: { d: "error" },
							},
							{
								comment: "Standalone comment",
								entries: { e: "error" },
							},
							{
								comment: "Duplicated comment",
								entries: { f: "error" },
							},
						],
					},
				],
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
			              "after": [
			                "
			For example, ESLint can be run with \`--fix\` to auto-fix some lint rule complaints:

			\`\`\`shell
			pnpm run lint --fix
			\`\`\`
			",
			              ],
			              "before": "
			This package includes several forms of linting to enforce consistent code quality and styling.
			Each should be shown in VS Code, and can be run manually on the command-line:
			",
			              "items": [
			                "- \`pnpm lint\` ([ESLint](https://eslint.org) with [typescript-eslint](https://typescript-eslint.io)): Lints JavaScript and TypeScript source files",
			              ],
			              "plural": "Read the individual documentation for each linter to understand how it can be configured and used best.",
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
			            "name": "Lint",
			            "steps": [
			              {
			                "run": "pnpm lint",
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
			            "@eslint/js": "9.39.1",
			            "@types/node": "24.10.1",
			            "eslint": "9.39.1",
			            "typescript-eslint": "8.48.1",
			          },
			          "scripts": {
			            "lint": "eslint . --max-warnings 0",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "extensions": [
			          "dbaeumer.vscode-eslint",
			        ],
			        "settings": {
			          "editor.codeActionsOnSave": {
			            "source.fixAll.eslint": "explicit",
			          },
			          "eslint.probe": [
			            "javascript",
			            "javascriptreact",
			            "json",
			            "jsonc",
			            "markdown",
			            "typescript",
			            "typescriptreact",
			            "yaml",
			          ],
			          "eslint.rules.customizations": [
			            {
			              "rule": "*",
			              "severity": "warn",
			            },
			          ],
			        },
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "eslint.config.js": "import eslint from "@eslint/js";
			import { defineConfig } from "eslint/config";
			import tseslint from "typescript-eslint";

			export default defineConfig(
				{ ignores: ["lib", "node_modules", "pnpm-lock.yaml"] },
				{ linterOptions: { reportUnusedDisableDirectives: "error" } },
				{ extends: [], files: ["**/*.js"], rules: {

			// Duplicated comment
			"a": "error","c": "error","d": "error","f": "error",

			// Standalone comment
			"b": "error","e": "error",}, },{ extends: [eslint.configs.recommended, tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked], files: ["**/*.{js,ts}"], languageOptions: {"parserOptions":{"projectService":{"allowDefaultProject":["*.config.*s"]}}}, }
			);",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm lint --fix",
			      ],
			      "phase": 3,
			    },
			  ],
			}
		`);
	});

	test("with multiline addon rules comments", () => {
		const creation = testBlock(blockESLint, {
			addons: {
				extensions: [
					{
						files: ["**/*.js"],
						rules: [
							{
								comment: "One line",
								entries: { a: "error" },
							},
							{
								comment: "Two lines\ntwo lines",
								entries: { a: "error" },
							},
							{
								comment: "Three lines\nthree lines\nthree lines",
								entries: { a: "error" },
							},
						],
					},
				],
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
			              "after": [
			                "
			For example, ESLint can be run with \`--fix\` to auto-fix some lint rule complaints:

			\`\`\`shell
			pnpm run lint --fix
			\`\`\`
			",
			              ],
			              "before": "
			This package includes several forms of linting to enforce consistent code quality and styling.
			Each should be shown in VS Code, and can be run manually on the command-line:
			",
			              "items": [
			                "- \`pnpm lint\` ([ESLint](https://eslint.org) with [typescript-eslint](https://typescript-eslint.io)): Lints JavaScript and TypeScript source files",
			              ],
			              "plural": "Read the individual documentation for each linter to understand how it can be configured and used best.",
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
			            "name": "Lint",
			            "steps": [
			              {
			                "run": "pnpm lint",
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
			            "@eslint/js": "9.39.1",
			            "@types/node": "24.10.1",
			            "eslint": "9.39.1",
			            "typescript-eslint": "8.48.1",
			          },
			          "scripts": {
			            "lint": "eslint . --max-warnings 0",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "extensions": [
			          "dbaeumer.vscode-eslint",
			        ],
			        "settings": {
			          "editor.codeActionsOnSave": {
			            "source.fixAll.eslint": "explicit",
			          },
			          "eslint.probe": [
			            "javascript",
			            "javascriptreact",
			            "json",
			            "jsonc",
			            "markdown",
			            "typescript",
			            "typescriptreact",
			            "yaml",
			          ],
			          "eslint.rules.customizations": [
			            {
			              "rule": "*",
			              "severity": "warn",
			            },
			          ],
			        },
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "eslint.config.js": "import eslint from "@eslint/js";
			import { defineConfig } from "eslint/config";
			import tseslint from "typescript-eslint";

			export default defineConfig(
				{ ignores: ["lib", "node_modules", "pnpm-lock.yaml"] },
				{ linterOptions: { reportUnusedDisableDirectives: "error" } },
				{ files: ["**/*.js"], rules: {

			// One line
			"a": "error",

			// Two lines
			// two lines
			"a": "error",

			// Three lines
			// three lines
			// three lines
			"a": "error",}, },{ extends: [eslint.configs.recommended, tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked], files: ["**/*.{js,ts}"], languageOptions: {"parserOptions":{"projectService":{"allowDefaultProject":["*.config.*s"]}}}, }
			);",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm lint --fix",
			      ],
			      "phase": 3,
			    },
			  ],
			}
		`);
	});

	test("with addon extensions merging where the first provides everything", () => {
		const creation = testBlock(blockESLint, {
			addons: {
				extensions: [
					{
						extends: ["a.configs.recommended"],
						files: ["**/*.a"],
						languageOptions: {
							languageOption: true,
						},
						linterOptions: {
							linterOption: true,
						},
						plugins: {
							"plugin-a-key": "plugin-a-value",
						},
						rules: {
							"a/b": "error",
						},
						settings: {
							react: {
								version: "detect",
							},
						},
					},
					{
						files: ["**/*.a"],
					},
				],
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
			              "after": [
			                "
			For example, ESLint can be run with \`--fix\` to auto-fix some lint rule complaints:

			\`\`\`shell
			pnpm run lint --fix
			\`\`\`
			",
			              ],
			              "before": "
			This package includes several forms of linting to enforce consistent code quality and styling.
			Each should be shown in VS Code, and can be run manually on the command-line:
			",
			              "items": [
			                "- \`pnpm lint\` ([ESLint](https://eslint.org) with [typescript-eslint](https://typescript-eslint.io)): Lints JavaScript and TypeScript source files",
			              ],
			              "plural": "Read the individual documentation for each linter to understand how it can be configured and used best.",
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
			            "name": "Lint",
			            "steps": [
			              {
			                "run": "pnpm lint",
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
			            "@eslint/js": "9.39.1",
			            "@types/node": "24.10.1",
			            "eslint": "9.39.1",
			            "typescript-eslint": "8.48.1",
			          },
			          "scripts": {
			            "lint": "eslint . --max-warnings 0",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "extensions": [
			          "dbaeumer.vscode-eslint",
			        ],
			        "settings": {
			          "editor.codeActionsOnSave": {
			            "source.fixAll.eslint": "explicit",
			          },
			          "eslint.probe": [
			            "javascript",
			            "javascriptreact",
			            "json",
			            "jsonc",
			            "markdown",
			            "typescript",
			            "typescriptreact",
			            "yaml",
			          ],
			          "eslint.rules.customizations": [
			            {
			              "rule": "*",
			              "severity": "warn",
			            },
			          ],
			        },
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "eslint.config.js": "import eslint from "@eslint/js";
			import { defineConfig } from "eslint/config";
			import tseslint from "typescript-eslint";

			export default defineConfig(
				{ ignores: ["lib", "node_modules", "pnpm-lock.yaml"] },
				{ linterOptions: { reportUnusedDisableDirectives: "error" } },
				{ extends: [a.configs.recommended], files: ["**/*.a"], languageOptions: {"languageOption":true}, linterOptions: {"linterOption":true} rules: {"a/b":"error"}, settings: {"react":{"version":"detect"}}, },{ extends: [eslint.configs.recommended, tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked], files: ["**/*.{js,ts}"], languageOptions: {"parserOptions":{"projectService":{"allowDefaultProject":["*.config.*s"]}}}, }
			);",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm lint --fix",
			      ],
			      "phase": 3,
			    },
			  ],
			}
		`);
	});

	test("with addon extensions merging where the second provides everything", () => {
		const creation = testBlock(blockESLint, {
			addons: {
				extensions: [
					{
						files: ["**/*.a"],
					},
					{
						extends: ["a.configs.recommended"],
						files: ["**/*.a"],
						languageOptions: {
							languageOption: true,
						},
						linterOptions: {
							linterOption: true,
						},
						plugins: {
							"plugin-a-key": "plugin-a-value",
						},
						rules: {
							"a/b": "error",
						},
						settings: {
							react: {
								version: "detect",
							},
						},
					},
				],
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
			              "after": [
			                "
			For example, ESLint can be run with \`--fix\` to auto-fix some lint rule complaints:

			\`\`\`shell
			pnpm run lint --fix
			\`\`\`
			",
			              ],
			              "before": "
			This package includes several forms of linting to enforce consistent code quality and styling.
			Each should be shown in VS Code, and can be run manually on the command-line:
			",
			              "items": [
			                "- \`pnpm lint\` ([ESLint](https://eslint.org) with [typescript-eslint](https://typescript-eslint.io)): Lints JavaScript and TypeScript source files",
			              ],
			              "plural": "Read the individual documentation for each linter to understand how it can be configured and used best.",
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
			            "name": "Lint",
			            "steps": [
			              {
			                "run": "pnpm lint",
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
			            "@eslint/js": "9.39.1",
			            "@types/node": "24.10.1",
			            "eslint": "9.39.1",
			            "typescript-eslint": "8.48.1",
			          },
			          "scripts": {
			            "lint": "eslint . --max-warnings 0",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "extensions": [
			          "dbaeumer.vscode-eslint",
			        ],
			        "settings": {
			          "editor.codeActionsOnSave": {
			            "source.fixAll.eslint": "explicit",
			          },
			          "eslint.probe": [
			            "javascript",
			            "javascriptreact",
			            "json",
			            "jsonc",
			            "markdown",
			            "typescript",
			            "typescriptreact",
			            "yaml",
			          ],
			          "eslint.rules.customizations": [
			            {
			              "rule": "*",
			              "severity": "warn",
			            },
			          ],
			        },
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "eslint.config.js": "import eslint from "@eslint/js";
			import { defineConfig } from "eslint/config";
			import tseslint from "typescript-eslint";

			export default defineConfig(
				{ ignores: ["lib", "node_modules", "pnpm-lock.yaml"] },
				{ linterOptions: { reportUnusedDisableDirectives: "error" } },
				{ extends: [a.configs.recommended], files: ["**/*.a"], languageOptions: {"languageOption":true}, linterOptions: {"linterOption":true} rules: {"a/b":"error"}, settings: {"react":{"version":"detect"}}, },{ extends: [eslint.configs.recommended, tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked], files: ["**/*.{js,ts}"], languageOptions: {"parserOptions":{"projectService":{"allowDefaultProject":["*.config.*s"]}}}, }
			);",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm lint --fix",
			      ],
			      "phase": 3,
			    },
			  ],
			}
		`);
	});

	test("with object options.bin", () => {
		const creation = testBlock(blockESLint, {
			options: {
				...optionsBase,
				bin: { repo: "bin/index.js" },
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
			              "after": [
			                "
			For example, ESLint can be run with \`--fix\` to auto-fix some lint rule complaints:

			\`\`\`shell
			pnpm run lint --fix
			\`\`\`
			",
			              ],
			              "before": "
			This package includes several forms of linting to enforce consistent code quality and styling.
			Each should be shown in VS Code, and can be run manually on the command-line:
			",
			              "items": [
			                "- \`pnpm lint\` ([ESLint](https://eslint.org) with [typescript-eslint](https://typescript-eslint.io)): Lints JavaScript and TypeScript source files",
			              ],
			              "plural": "Read the individual documentation for each linter to understand how it can be configured and used best.",
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
			            "name": "Lint",
			            "steps": [
			              {
			                "run": "pnpm build",
			              },
			              {
			                "run": "pnpm lint",
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
			            "@eslint/js": "9.39.1",
			            "@types/node": "24.10.1",
			            "eslint": "9.39.1",
			            "typescript-eslint": "8.48.1",
			          },
			          "scripts": {
			            "lint": "eslint . --max-warnings 0",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "extensions": [
			          "dbaeumer.vscode-eslint",
			        ],
			        "settings": {
			          "editor.codeActionsOnSave": {
			            "source.fixAll.eslint": "explicit",
			          },
			          "eslint.probe": [
			            "javascript",
			            "javascriptreact",
			            "json",
			            "jsonc",
			            "markdown",
			            "typescript",
			            "typescriptreact",
			            "yaml",
			          ],
			          "eslint.rules.customizations": [
			            {
			              "rule": "*",
			              "severity": "warn",
			            },
			          ],
			        },
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "eslint.config.js": "import eslint from "@eslint/js";
			import { defineConfig } from "eslint/config";
			import tseslint from "typescript-eslint";

			export default defineConfig(
				{ ignores: ["lib", "node_modules", "pnpm-lock.yaml"] },
				{ linterOptions: { reportUnusedDisableDirectives: "error" } },
				{ extends: [eslint.configs.recommended, tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked], files: ["**/*.{js,ts}"], languageOptions: {"parserOptions":{"projectService":{"allowDefaultProject":["*.config.*s","bin/index.js"]}}}, }
			);",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm lint --fix",
			      ],
			      "phase": 3,
			    },
			  ],
			}
		`);
	});

	test("with string options.bin", () => {
		const creation = testBlock(blockESLint, {
			options: {
				...optionsBase,
				bin: "bin/index.js",
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
			              "after": [
			                "
			For example, ESLint can be run with \`--fix\` to auto-fix some lint rule complaints:

			\`\`\`shell
			pnpm run lint --fix
			\`\`\`
			",
			              ],
			              "before": "
			This package includes several forms of linting to enforce consistent code quality and styling.
			Each should be shown in VS Code, and can be run manually on the command-line:
			",
			              "items": [
			                "- \`pnpm lint\` ([ESLint](https://eslint.org) with [typescript-eslint](https://typescript-eslint.io)): Lints JavaScript and TypeScript source files",
			              ],
			              "plural": "Read the individual documentation for each linter to understand how it can be configured and used best.",
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
			            "name": "Lint",
			            "steps": [
			              {
			                "run": "pnpm build",
			              },
			              {
			                "run": "pnpm lint",
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
			            "@eslint/js": "9.39.1",
			            "@types/node": "24.10.1",
			            "eslint": "9.39.1",
			            "typescript-eslint": "8.48.1",
			          },
			          "scripts": {
			            "lint": "eslint . --max-warnings 0",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "extensions": [
			          "dbaeumer.vscode-eslint",
			        ],
			        "settings": {
			          "editor.codeActionsOnSave": {
			            "source.fixAll.eslint": "explicit",
			          },
			          "eslint.probe": [
			            "javascript",
			            "javascriptreact",
			            "json",
			            "jsonc",
			            "markdown",
			            "typescript",
			            "typescriptreact",
			            "yaml",
			          ],
			          "eslint.rules.customizations": [
			            {
			              "rule": "*",
			              "severity": "warn",
			            },
			          ],
			        },
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "eslint.config.js": "import eslint from "@eslint/js";
			import { defineConfig } from "eslint/config";
			import tseslint from "typescript-eslint";

			export default defineConfig(
				{ ignores: ["lib", "node_modules", "pnpm-lock.yaml"] },
				{ linterOptions: { reportUnusedDisableDirectives: "error" } },
				{ extends: [eslint.configs.recommended, tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked], files: ["**/*.{js,ts}"], languageOptions: {"parserOptions":{"projectService":{"allowDefaultProject":["*.config.*s","bin/index.js"]}}}, }
			);",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm lint --fix",
			      ],
			      "phase": 3,
			    },
			  ],
			}
		`);
	});

	test("with options.type set to commonjs", () => {
		const creation = testBlock(blockESLint, {
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
			        "sections": {
			          "Linting": {
			            "contents": {
			              "after": [
			                "
			For example, ESLint can be run with \`--fix\` to auto-fix some lint rule complaints:

			\`\`\`shell
			pnpm run lint --fix
			\`\`\`
			",
			              ],
			              "before": "
			This package includes several forms of linting to enforce consistent code quality and styling.
			Each should be shown in VS Code, and can be run manually on the command-line:
			",
			              "items": [
			                "- \`pnpm lint\` ([ESLint](https://eslint.org) with [typescript-eslint](https://typescript-eslint.io)): Lints JavaScript and TypeScript source files",
			              ],
			              "plural": "Read the individual documentation for each linter to understand how it can be configured and used best.",
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
			            "name": "Lint",
			            "steps": [
			              {
			                "run": "pnpm lint",
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
			            "@eslint/js": "9.39.1",
			            "@types/node": "24.10.1",
			            "eslint": "9.39.1",
			            "typescript-eslint": "8.48.1",
			          },
			          "scripts": {
			            "lint": "eslint . --max-warnings 0",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "extensions": [
			          "dbaeumer.vscode-eslint",
			        ],
			        "settings": {
			          "editor.codeActionsOnSave": {
			            "source.fixAll.eslint": "explicit",
			          },
			          "eslint.probe": [
			            "javascript",
			            "javascriptreact",
			            "json",
			            "jsonc",
			            "markdown",
			            "typescript",
			            "typescriptreact",
			            "yaml",
			          ],
			          "eslint.rules.customizations": [
			            {
			              "rule": "*",
			              "severity": "warn",
			            },
			          ],
			        },
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "eslint.config.mjs": "import eslint from "@eslint/js";
			import { defineConfig } from "eslint/config";
			import tseslint from "typescript-eslint";

			export default defineConfig(
				{ ignores: ["lib", "node_modules", "pnpm-lock.yaml"] },
				{ linterOptions: { reportUnusedDisableDirectives: "error" } },
				{ files: ["*.mjs"], languageOptions: {"sourceType":"module"}, },{ extends: [eslint.configs.recommended, tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked], files: ["**/*.{js,mjs,ts}"], languageOptions: {"parserOptions":{"projectService":{"allowDefaultProject":["*.config.*s"]}}}, }
			);",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm lint --fix",
			      ],
			      "phase": 3,
			    },
			  ],
			}
		`);
	});

	test("with options.type set to module", () => {
		const creation = testBlock(blockESLint, {
			options: {
				...optionsBase,
				type: "module",
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
			              "after": [
			                "
			For example, ESLint can be run with \`--fix\` to auto-fix some lint rule complaints:

			\`\`\`shell
			pnpm run lint --fix
			\`\`\`
			",
			              ],
			              "before": "
			This package includes several forms of linting to enforce consistent code quality and styling.
			Each should be shown in VS Code, and can be run manually on the command-line:
			",
			              "items": [
			                "- \`pnpm lint\` ([ESLint](https://eslint.org) with [typescript-eslint](https://typescript-eslint.io)): Lints JavaScript and TypeScript source files",
			              ],
			              "plural": "Read the individual documentation for each linter to understand how it can be configured and used best.",
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
			            "name": "Lint",
			            "steps": [
			              {
			                "run": "pnpm lint",
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
			            "@eslint/js": "9.39.1",
			            "@types/node": "24.10.1",
			            "eslint": "9.39.1",
			            "typescript-eslint": "8.48.1",
			          },
			          "scripts": {
			            "lint": "eslint . --max-warnings 0",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "extensions": [
			          "dbaeumer.vscode-eslint",
			        ],
			        "settings": {
			          "editor.codeActionsOnSave": {
			            "source.fixAll.eslint": "explicit",
			          },
			          "eslint.probe": [
			            "javascript",
			            "javascriptreact",
			            "json",
			            "jsonc",
			            "markdown",
			            "typescript",
			            "typescriptreact",
			            "yaml",
			          ],
			          "eslint.rules.customizations": [
			            {
			              "rule": "*",
			              "severity": "warn",
			            },
			          ],
			        },
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "eslint.config.js": "import eslint from "@eslint/js";
			import { defineConfig } from "eslint/config";
			import tseslint from "typescript-eslint";

			export default defineConfig(
				{ ignores: ["lib", "node_modules", "pnpm-lock.yaml"] },
				{ linterOptions: { reportUnusedDisableDirectives: "error" } },
				{ extends: [eslint.configs.recommended, tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked], files: ["**/*.{js,ts}"], languageOptions: {"parserOptions":{"projectService":{"allowDefaultProject":["*.config.*s"]}}}, }
			);",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm lint --fix",
			      ],
			      "phase": 3,
			    },
			  ],
			}
		`);
	});

	describe("intake", () => {
		it("returns undefined when there is no eslint.config file", () => {
			const actual = testIntake(blockESLint, {
				files: {},
			});

			expect(actual).toBeUndefined();
		});

		it("returns data when there is an eslint.config.js file", () => {
			const sourceText = "export default ...";

			const actual = testIntake(blockESLint, {
				files: {
					"eslint.config.js": [sourceText],
				},
			});

			expect(mockBlockESLintIntake).toHaveBeenCalledWith(sourceText);
			expect(actual).toBe(mockIntakeData);
		});

		it("returns data when there is an eslint.config.mjs file", () => {
			const sourceText = "export default ...";

			const actual = testIntake(blockESLint, {
				files: {
					"eslint.config.mjs": [sourceText],
				},
			});

			expect(mockBlockESLintIntake).toHaveBeenCalledWith(sourceText);
			expect(actual).toBe(mockIntakeData);
		});
	});
});
