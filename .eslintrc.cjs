module.exports = {
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
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: ["./tsconfig.json"],
	},
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
		"deprecation/deprecation": "error",
		"no-only-tests/no-only-tests": "error",
		"simple-import-sort/exports": "error",
		"simple-import-sort/imports": "error",
	},
};
