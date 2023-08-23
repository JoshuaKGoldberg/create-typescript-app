import { InputValues } from "../../../shared/readInputs.js";
import { formatTypeScript } from "./formatters/formatTypeScript.js";

export async function createESLintRC(values: InputValues) {
	return await formatTypeScript(`/*
👋 Hi! This ESLint configuration contains a lot more stuff than many repos'!
You can read from it to see all sorts of linting goodness, but don't worry -
it's not something you need to exhaustively understand immediately. 💙

If you're interested in learning more, see the 'getting started' docs on:
- ESLint: https://eslint.org
- typescript-eslint: https://typescript-eslint.io
*/

/** @type {import("@types/eslint").Linter.Config} */
module.exports = {
	env: {
		es2022: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:eslint-comments/recommended",
		"plugin:n/recommended",${
			values.excludeLintPerfectionist
				? ""
				: `
		"plugin:perfectionist/recommended-natural",`
		}
		"plugin:regexp/recommended",
		"prettier",
	],
	overrides: [${
		values.excludeLintMd
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
				"plugin:jsdoc/recommended-typescript-error",
				"plugin:@typescript-eslint/recommended",
			],
			files: ["**/*.ts"],
			parser: "@typescript-eslint/parser",
			rules: {
				// These off-by-default rules work well for this repo and we like them on.
				"jsdoc/informative-docs": "error",

				// These on-by-default rules don't work well for this repo and we like them off.
				"jsdoc/require-jsdoc": "off",
				"jsdoc/require-param": "off",
				"jsdoc/require-property": "off",
				"jsdoc/require-returns": "off",
			},
		},
		{
			${
				values.excludeLintMd
					? ""
					: `excludedFiles: ["**/*.md/*.ts"],
			`
			}extends: [
				"plugin:@typescript-eslint/recommended-requiring-type-checking",
				"plugin:@typescript-eslint/strict",
			],
			files: ["**/*.ts"],
			parser: "@typescript-eslint/parser",
			parserOptions: {
				project: "./tsconfig.eslint.json",
			},
			rules: {
				// These off-by-default rules work well for this repo and we like them on.
				"deprecation/deprecation": "error",
			},
		},
		{
			excludedFiles: ["package.json"],
			extends: ["plugin:jsonc/recommended-with-json"],
			files: ["*.json", "*.jsonc"],
			parser: "jsonc-eslint-parser",
			rules: {
				"jsonc/sort-keys": "error",
			},
		},${
			values.excludeTests
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
			values.excludeLintYml
				? ""
				: `\n
		{
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
		"deprecation",
		"import",
		"jsdoc",${values.excludeTests ? "" : `"no-only-tests",`}${
			values.excludeLintPerfectionist ? "" : `"perfectionist",`
		}
		"regexp",${values.excludeTests ? "" : `\n"vitest",`}
	],
	root: true,
	rules: {
		// These off/less-strict-by-default rules work well for this repo and we like them on.
		"@typescript-eslint/no-unused-vars": ["error", { caughtErrors: "all" }],
		"import/extensions": ["error", "ignorePackages"],
		"n/no-missing-import": "off",${
			values.excludeTests ? "" : `\n"no-only-tests/no-only-tests": "error",`
		}

		// These on-by-default rules don't work well for this repo and we like them off.
		"no-case-declarations": "off",
		"no-constant-condition": "off",
		"no-inner-declarations": "off",

		// Stylistic concerns that don't interfere with Prettier
		curly: ["error", "all"],
		"padding-line-between-statements": "off",
		"@typescript-eslint/padding-line-between-statements": [
			"error",
			{ blankLine: "always", next: "*", prev: "block-like" },
		],
	},
};
`);
}
