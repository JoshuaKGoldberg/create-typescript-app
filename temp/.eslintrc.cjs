/** @type {import("@types/eslint").Linter.Config} */
module.exports = {
	env: {
		es2022: true,
		node: true,
	},
	extends: ["eslint:recommended", "plugin:n/recommended"],
	overrides: [
		{
			extends: ["plugin:@typescript-eslint/recommended"],
			files: ["**/*.ts"],
			parser: "@typescript-eslint/parser",
			rules: {
				// These off-by-default rules work well for this repo and we like them on.
				"logical-assignment-operators": [
					"error",
					"always",
					{ enforceForIfStatements: true },
				],
				"operator-assignment": "error",
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
			extends: ["plugin:@typescript-eslint/recommended-type-checked"],
			files: ["**/*.ts"],
			parser: "@typescript-eslint/parser",
			parserOptions: {
				project: "./tsconfig.eslint.json",
			},
		},
	],
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	reportUnusedDisableDirectives: true,
	root: true,
	rules: {
		// These off/less-strict-by-default rules work well for this repo and we like them on.
		"@typescript-eslint/no-unused-vars": ["error", { caughtErrors: "all" }],

		// These on-by-default rules don't work well for this repo and we like them off.
		"no-case-declarations": "off",
		"no-constant-condition": "off",
		"no-inner-declarations": "off",
		"no-mixed-spaces-and-tabs": "off",
	},
};
