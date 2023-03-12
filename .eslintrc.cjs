module.exports = {
	env: {
		es2022: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:eslint-comments/recommended",
		"plugin:regexp/recommended",
		"prettier",
	],
	overrides: [
		{
			extends: ["plugin:markdown/recommended"],
			files: ["**/*.md"],
			processor: "markdown/markdown",
		},
		{
			// Only rules that don't require type information are allowed
			extends: [
				"plugin:@typescript-eslint/recommended",
				"plugin:typescript-sort-keys/recommended",
			],
			// https://github.com/eslint/eslint-plugin-markdown/issues/114#issuecomment-818463890
			files: ["**/*.ts"],
			parser: "@typescript-eslint/parser",
		},
		{
			extends: [
				"plugin:@typescript-eslint/recommended-requiring-type-checking",
				"plugin:@typescript-eslint/strict",
			],
			excludedFiles: ["**/*.md/*.ts"],
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
			files: ["*.json", "*.jsonc"],
			excludedFiles: ["package.json"],
			parser: "jsonc-eslint-parser",
			rules: {
				"jsonc/sort-keys": "error",
			},
			extends: ["plugin:jsonc/recommended-with-json"],
		},
		{
			files: "**/*.test.ts",
			rules: {
				"@typescript-eslint/no-unsafe-assignment": "off",
				"@typescript-eslint/no-unsafe-call": "off",
			},
		},
	],
	parser: "@typescript-eslint/parser",
	plugins: [
		"@typescript-eslint",
		"deprecation",
		"import",
		"no-only-tests",
		"regexp",
		"simple-import-sort",
		"typescript-sort-keys",
		"vitest",
	],
	root: true,
	rules: {
		// These off-by-default rules work well for this repo and we like them on.
		"import/extensions": ["error", "ignorePackages"],
		"no-only-tests/no-only-tests": "error",
		"simple-import-sort/exports": "error",
		"simple-import-sort/imports": "error",

		// These on-by-default rules don't work well for this repo and we like them off.
		"no-inner-declarations": "off",

		// Stylistic concerns that don't interfere with Prettier
		"padding-line-between-statements": "off",
		"@typescript-eslint/padding-line-between-statements": [
			"error",
			{ blankLine: "always", next: "*", prev: "block-like" },
		],
	},
};
