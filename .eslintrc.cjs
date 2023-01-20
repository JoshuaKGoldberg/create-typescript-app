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
			files: ["**/*.{md}"],
			processor: "markdown/markdown",
		},
		{
			extends: [
				"plugin:@typescript-eslint/recommended",
				"plugin:@typescript-eslint/recommended-requiring-type-checking",
				"plugin:typescript-sort-keys/recommended",
				"plugin:@typescript-eslint/strict",
			],
			files: ["**/*.{ts,tsx}"],
			parserOptions: {
				project: "./tsconfig.eslint.json",
			},
			rules: {
				// These off-by-default rules work well for this repo and we like them on.
				"deprecation/deprecation": "error",
			},
		},
		{
			files: "*.json",
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
		"no-only-tests",
		"regexp",
		"simple-import-sort",
		"typescript-sort-keys",
		"vitest",
	],
	root: true,
	rules: {
		// These off-by-default rules work well for this repo and we like them on.
		"no-only-tests/no-only-tests": "error",
		"simple-import-sort/exports": "error",
		"simple-import-sort/imports": "error",

		// These on-by-default rules don't work well for this repo and we like them off.
		"no-inner-declarations": "off",
	},
};
