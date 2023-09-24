import { Options } from "../../../shared/types.js";
import { formatTypeScript } from "./formatters/formatTypeScript.js";

export async function createESLintRC(options: Options) {
	return await formatTypeScript(`/** @type {import("@types/eslint").Linter.Config} */
module.exports = {
	env: {
		es2022: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		${
			options.excludeLintESLint
				? ""
				: `"plugin:eslint-comments/recommended",
		`
		}"plugin:n/recommended",${
			options.excludeLintPerfectionist
				? ""
				: `
		"plugin:perfectionist/recommended-natural",`
		}${options.excludeLintRegex ? "" : `"plugin:regexp/recommended",`}
	],
	overrides: [${
		options.excludeLintMd
			? ""
			: `
		{
			extends: ["plugin:markdown/recommended"],
			files: ["**/*.md"],
			processor: "markdown/markdown",
		},`
	}
		{
			extends: [
				${
					options.excludeLintJSDoc
						? ""
						: `"plugin:jsdoc/recommended-typescript-error",
				`
				}"plugin:@typescript-eslint/${
					options.excludeLintStrict ? "recommended" : "strict"
				}",${
					options.excludeLintStylistic
						? ""
						: `
				"plugin:@typescript-eslint/stylistic",`
				}
			],
			files: ["**/*.ts"],
			parser: "@typescript-eslint/parser",
			rules: {
				// These off-by-default rules work well for this repo and we like them on.
				${
					options.excludeLintJSDoc
						? ""
						: `"jsdoc/informative-docs": "error",
				`
				}"logical-assignment-operators": [
					"error",
					"always",
					{ enforceForIfStatements: true },
				],
				"operator-assignment": "error",${
					options.excludeLintJSDoc
						? ""
						: `

				// These on-by-default rules don't work well for this repo and we like them off.
				"jsdoc/require-jsdoc": "off",
				"jsdoc/require-param": "off",
				"jsdoc/require-property": "off",
				"jsdoc/require-returns": "off",`
				}
			},
		},
		{
			files: "**/*.md/*.ts",
			rules: {
				"n/no-missing-import": [
					"error",
					{ allowModules: ["create-typescript-app"] },
				],
			},
		},
		{
			${
				options.excludeLintMd
					? ""
					: `excludedFiles: ["**/*.md/*.ts"],
			`
			}extends: [
				"plugin:@typescript-eslint/${
					options.excludeLintStrict ? "recommended" : "strict"
				}-type-checked",${
					options.excludeLintStylistic
						? ""
						: `
				"plugin:@typescript-eslint/stylistic-type-checked",`
				}
			],
			files: ["**/*.ts"],
			parser: "@typescript-eslint/parser",
			parserOptions: {
				project: "./tsconfig.eslint.json",
			},${
				options.excludeLintDeprecation
					? ""
					: `rules: {
				// These off-by-default rules work well for this repo and we like them on.
				"deprecation/deprecation": "error",
			},`
			}
		},
		${
			options.excludeLintJson
				? ""
				: `{
			excludedFiles: ["package.json"],
			extends: ["plugin:jsonc/recommended-with-json"],
			files: ["*.json", "*.jsonc"],
			parser: "jsonc-eslint-parser",
			rules: {
				"jsonc/sort-keys": "error",
			},
		},
		{
			files: ["*.jsonc"],
			rules: {
				"jsonc/no-comments": "off",
			},
		},`
		}${
			options.excludeTests
				? ""
				: `\n{
			files: "**/*.test.ts",
			rules: {
				// These on-by-default rules aren't useful in test files.
				"@typescript-eslint/no-unsafe-assignment": "off",
				"@typescript-eslint/no-unsafe-call": "off",
			},
		},`
		}${
			options.excludeLintYml
				? ""
				: `\n{
			extends: ["plugin:yml/standard", "plugin:yml/prettier"],
			files: ["**/*.{yml,yaml}"],
			parser: "yaml-eslint-parser",
			rules: {
				"yml/file-extension": ["error", { extension: "yml" }],
				"yml/sort-keys": [
					"error",
					{
						order: { type: "asc" },
						pathPattern: "^.*$",
					},
				],
				"yml/sort-sequence-values": [
					"error",
					{
						order: { type: "asc" },
						pathPattern: "^.*$",
					},
				],
			},
		},
	`
		}],
	parser: "@typescript-eslint/parser",
	plugins: [
		"@typescript-eslint",
		${
			options.excludeLintDeprecation
				? ""
				: `"deprecation",
		`
		}${
			options.excludeLintJSDoc
				? ""
				: `"jsdoc",
		`
		}${options.excludeTests ? "" : `"no-only-tests",`}${
			options.excludeLintPerfectionist ? "" : `"perfectionist",`
		}${options.excludeLintRegex ? "" : `"regexp",`}${
			options.excludeTests ? "" : `\n"vitest",`
		}
	],
	reportUnusedDisableDirectives: true,
	root: true,
	rules: {
		// These off/less-strict-by-default rules work well for this repo and we like them on.
		"@typescript-eslint/no-unused-vars": ["error", { caughtErrors: "all" }],${
			options.excludeTests ? "" : `\n"no-only-tests/no-only-tests": "error",`
		}

		// These on-by-default rules don't work well for this repo and we like them off.
		"no-case-declarations": "off",
		"no-constant-condition": "off",
		"no-inner-declarations": "off",
		"no-mixed-spaces-and-tabs": "off",

		${
			options.excludeLintStylistic
				? ""
				: `// Stylistic concerns that don't interfere with Prettier
		"@typescript-eslint/padding-line-between-statements": [
			"error",
			{ blankLine: "always", next: "*", prev: "block-like" },
		],
		`
		}${
			options.excludeLintPerfectionist
				? ""
				: `"perfectionist/sort-objects": [
			"error",
			{
				order: "asc",
				"partition-by-comment": true,
				type: "natural",
			},
		],`
		}
	},
};
`);
}
