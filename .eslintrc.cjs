module.exports = {
	extends: [
		"eslint:recommended",
		"plugin:typescript-sort-keys/recommended",
		"prettier",
	],
	overrides: [
		{
			extends: [
				"plugin:@typescript-eslint/recommended",
				"plugin:@typescript-eslint/recommended-requiring-type-checking",
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
	plugins: ["@typescript-eslint", "simple-import-sort", "typescript-sort-keys"],
	root: true,
	rules: {
		"simple-import-sort/exports": "error",
		"simple-import-sort/imports": "error",
	},
};
