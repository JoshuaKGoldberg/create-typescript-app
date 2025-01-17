import { testBlock } from "create-testers";
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
			        "words": [
			          "tseslint",
			        ],
			      },
			      "block": [Function],
			    },
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
			            "@eslint/js": "9.17.0",
			            "@types/node": "22.10.2",
			            "eslint": "9.17.0",
			            "typescript-eslint": "8.19.0",
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
				{ extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked], files: ["**/*.js", "**/*.ts"], languageOptions: {"parserOptions":{"projectService":{"allowDefaultProject":["*.config.*s"]},"tsconfigRootDir":import.meta.dirname}}, }
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

	test("migration mode", () => {
		const creation = testBlock(blockESLint, {
			mode: "migrate",
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "words": [
			          "tseslint",
			        ],
			      },
			      "block": [Function],
			    },
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
			            "@eslint/js": "9.17.0",
			            "@types/node": "22.10.2",
			            "eslint": "9.17.0",
			            "typescript-eslint": "8.19.0",
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
				{ extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked], files: ["**/*.js", "**/*.ts"], languageOptions: {"parserOptions":{"projectService":{"allowDefaultProject":["*.config.*s"]},"tsconfigRootDir":import.meta.dirname}}, }
			);",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm lint --fix",
			      ],
			      "phase": 3,
			    },
			    {
			      "commands": [
			        "rm .eslintrc* .eslintignore eslint.config.*",
			      ],
			      "phase": 0,
			      "silent": true,
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
				],
				ignores: ["generated"],
				imports: [
					{ source: "eslint-plugin-markdown", specifier: "a", types: true },
					{ source: "eslint-plugin-regexp", specifier: "b" },
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
			        "words": [
			          "tseslint",
			        ],
			      },
			      "block": [Function],
			    },
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
			            "@eslint/js": "9.17.0",
			            "@types/eslint-plugin-markdown": "2.0.2",
			            "@types/node": "22.10.2",
			            "eslint": "9.17.0",
			            "eslint-plugin-markdown": "5.1.0",
			            "eslint-plugin-regexp": "2.7.0",
			            "typescript-eslint": "8.19.0",
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
			import tseslint from "typescript-eslint";

			export default tseslint.config(
				{ ignores: ["generated", "lib", "node_modules", "pnpm-lock.yaml"] },
				{ linterOptions: {"reportUnusedDisableDirectives":"error"} },
				eslint.configs.recommended,
				a.configs.recommended,{ extends: [b.configs.recommended], files: ["**/*.b"], rules: {"b/c":"error","b/d":["error",{"e":"f"}]}, },{ extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked], files: ["**/*.js", "**/*.ts"], languageOptions: {"parserOptions":{"projectService":{"allowDefaultProject":["*.config.*s"]},"tsconfigRootDir":import.meta.dirname}}, rules: {"a/b":"error","a/c":["error",{"d":"e"}]}, settings: {"react":{"version":"detect"}}, }
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

	test("with options.bin", () => {
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
			        "words": [
			          "tseslint",
			        ],
			      },
			      "block": [Function],
			    },
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
			            "@eslint/js": "9.17.0",
			            "@types/node": "22.10.2",
			            "eslint": "9.17.0",
			            "typescript-eslint": "8.19.0",
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
				{ extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked], files: ["**/*.js", "**/*.ts"], languageOptions: {"parserOptions":{"projectService":{"allowDefaultProject":["*.config.*s","bin/index.js"]},"tsconfigRootDir":import.meta.dirname}}, }
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
