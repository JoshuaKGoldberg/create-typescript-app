import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockESLint } from "./blockESLint.js";
import { optionsBase } from "./options.fakes.js";

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
			            "@eslint/js": "9.22.0",
			            "@types/node": "22.13.10",
			            "eslint": "9.22.0",
			            "typescript-eslint": "8.26.1",
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
			import tseslint from "typescript-eslint";

			export default tseslint.config(
				{ ignores: ["lib", "node_modules", "pnpm-lock.yaml"] },
				{ linterOptions: {"reportUnusedDisableDirectives":"error"} },
				eslint.configs.recommended,
				{ extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked], files: ["**/*.{js,ts}"], languageOptions: {"parserOptions":{"projectService":{"allowDefaultProject":["*.config.*s"]},"tsconfigRootDir":import.meta.dirname}}, }
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
			            "@eslint/js": "9.22.0",
			            "@types/node": "22.13.10",
			            "eslint": "9.22.0",
			            "typescript-eslint": "8.26.1",
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
			          "jsonc-eslint-parser",
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
			import tseslint from "typescript-eslint";

			export default tseslint.config(
				{ ignores: ["lib", "node_modules", "pnpm-lock.yaml"] },
				{ linterOptions: {"reportUnusedDisableDirectives":"error"} },
				eslint.configs.recommended,
				{ extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked], files: ["**/*.{js,ts}"], languageOptions: {"parserOptions":{"projectService":{"allowDefaultProject":["*.config.*s"]},"tsconfigRootDir":import.meta.dirname}}, }
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
			            "@eslint/js": "9.22.0",
			            "@types/node": "22.13.10",
			            "eslint": "9.22.0",
			            "typescript-eslint": "8.26.1",
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
			          "jsonc-eslint-parser",
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
			import tseslint from "typescript-eslint";

			export default tseslint.config(
				{ ignores: ["lib", "node_modules", "pnpm-lock.yaml"] },
				{ linterOptions: {"reportUnusedDisableDirectives":"error"} },
				eslint.configs.recommended,
				{ extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked], files: ["**/*.{js,mjs,ts}"], languageOptions: {"parserOptions":{"projectService":{"allowDefaultProject":["*.config.*s"]},"tsconfigRootDir":import.meta.dirname}}, },{ files: ["*.mjs"], languageOptions: {"sourceType":"module"}, }
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
					"a.configs.recommended",
					{
						extends: ["b.configs.recommended"],
						files: ["**/*.b"],
						rules: {
							"b/c": "error",
							"b/d": ["error", { e: "f" }],
						},
					},
					{
						extends: ["c.configs.recommended"],
						rules: {
							"c/d": "error",
							"c/e": ["error", { f: "g" }],
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
				rules: {
					"a/b": "error",
					"a/c": ["error", { d: "e" }],
				},
				settings: {
					react: {
						version: "detect",
					},
				},
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
			            "@eslint/js": "9.22.0",
			            "@types/eslint-plugin-markdown": "2.0.2",
			            "@types/node": "22.13.10",
			            "eslint": "9.22.0",
			            "eslint-plugin-markdown": "5.1.0",
			            "eslint-plugin-regexp": "2.7.0",
			            "eslint-plugin-unknown": "1.2.3",
			            "typescript-eslint": "8.26.1",
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
			import tseslint from "typescript-eslint";

			export default tseslint.config(
				{ ignores: ["generated", "lib", "node_modules", "pnpm-lock.yaml"] },
				{ linterOptions: {"reportUnusedDisableDirectives":"error"} },
				eslint.configs.recommended,
				a.configs.recommended,{ extends: [b.configs.recommended], files: ["**/*.b"], rules: {"b/c":"error","b/d":["error",{"e":"f"}]}, },{ extends: [c.configs.recommended], rules: {"c/d":"error","c/e":["error",{"f":"g"}]}, },{ extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked], files: ["**/*.{js,ts}"], languageOptions: {"parserOptions":{"projectService":{"allowDefaultProject":["*.config.*s"]},"tsconfigRootDir":import.meta.dirname}}, rules: {"a/b":"error","a/c":["error",{"d":"e"}]}, settings: {"react":{"version":"detect"}}, }
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

	test("with multiline addon rules comment", () => {
		const creation = testBlock(blockESLint, {
			addons: {
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
			            "@eslint/js": "9.22.0",
			            "@types/node": "22.13.10",
			            "eslint": "9.22.0",
			            "typescript-eslint": "8.26.1",
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
			import tseslint from "typescript-eslint";

			export default tseslint.config(
				{ ignores: ["lib", "node_modules", "pnpm-lock.yaml"] },
				{ linterOptions: {"reportUnusedDisableDirectives":"error"} },
				eslint.configs.recommended,
				{ extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked], files: ["**/*.{js,ts}"], languageOptions: {"parserOptions":{"projectService":{"allowDefaultProject":["*.config.*s"]},"tsconfigRootDir":import.meta.dirname}}, rules: {

			// One line
			"a": "error",

			// Two lines
			// two lines
			"a": "error",

			// Three lines
			// three lines
			// three lines
			"a": "error",}, }
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
			            "@eslint/js": "9.22.0",
			            "@types/node": "22.13.10",
			            "eslint": "9.22.0",
			            "typescript-eslint": "8.26.1",
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
			import tseslint from "typescript-eslint";

			export default tseslint.config(
				{ ignores: ["lib", "node_modules", "pnpm-lock.yaml"] },
				{ linterOptions: {"reportUnusedDisableDirectives":"error"} },
				eslint.configs.recommended,
				{ extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked], files: ["**/*.{js,ts}"], languageOptions: {"parserOptions":{"projectService":{"allowDefaultProject":["*.config.*s","bin/index.js"]},"tsconfigRootDir":import.meta.dirname}}, }
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
			            "@eslint/js": "9.22.0",
			            "@types/node": "22.13.10",
			            "eslint": "9.22.0",
			            "typescript-eslint": "8.26.1",
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
			import tseslint from "typescript-eslint";

			export default tseslint.config(
				{ ignores: ["lib", "node_modules", "pnpm-lock.yaml"] },
				{ linterOptions: {"reportUnusedDisableDirectives":"error"} },
				eslint.configs.recommended,
				{ extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked], files: ["**/*.{js,ts}"], languageOptions: {"parserOptions":{"projectService":{"allowDefaultProject":["*.config.*s","bin/index.js"]},"tsconfigRootDir":import.meta.dirname}}, }
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
			            "@eslint/js": "9.22.0",
			            "@types/node": "22.13.10",
			            "eslint": "9.22.0",
			            "typescript-eslint": "8.26.1",
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
			import tseslint from "typescript-eslint";

			export default tseslint.config(
				{ ignores: ["lib", "node_modules", "pnpm-lock.yaml"] },
				{ linterOptions: {"reportUnusedDisableDirectives":"error"} },
				eslint.configs.recommended,
				{ extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked], files: ["**/*.{js,mjs,ts}"], languageOptions: {"parserOptions":{"projectService":{"allowDefaultProject":["*.config.*s"]},"tsconfigRootDir":import.meta.dirname}}, },{ files: ["*.mjs"], languageOptions: {"sourceType":"module"}, }
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
			            "@eslint/js": "9.22.0",
			            "@types/node": "22.13.10",
			            "eslint": "9.22.0",
			            "typescript-eslint": "8.26.1",
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
			import tseslint from "typescript-eslint";

			export default tseslint.config(
				{ ignores: ["lib", "node_modules", "pnpm-lock.yaml"] },
				{ linterOptions: {"reportUnusedDisableDirectives":"error"} },
				eslint.configs.recommended,
				{ extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked], files: ["**/*.{js,ts}"], languageOptions: {"parserOptions":{"projectService":{"allowDefaultProject":["*.config.*s"]},"tsconfigRootDir":import.meta.dirname}}, }
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
});
