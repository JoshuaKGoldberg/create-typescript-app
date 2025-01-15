/*
👋 Hi! This ESLint configuration contains a lot more stuff than many repos'!
You can read from it to see all sorts of linting goodness, but don't worry -
it's not something you need to exhaustively understand immediately. 💙

If you're interested in learning more, see the 'getting started' docs on:
- ESLint: https://eslint.org
- typescript-eslint: https://typescript-eslint.io
*/

import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import eslint from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import jsdoc from "eslint-plugin-jsdoc";
import jsonc from "eslint-plugin-jsonc";
import markdown from "eslint-plugin-markdown";
import n from "eslint-plugin-n";
import packageJson from "eslint-plugin-package-json/configs/recommended";
import perfectionist from "eslint-plugin-perfectionist";
import * as regexp from "eslint-plugin-regexp";
import yml from "eslint-plugin-yml";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{
		ignores: ["**/*.snap", "coverage", "lib", "node_modules", "pnpm-lock.yaml"],
	},
	{ linterOptions: { reportUnusedDisableDirectives: "error" } },
	eslint.configs.recommended,
	comments.recommended,
	jsdoc.configs["flat/contents-typescript-error"],
	jsdoc.configs["flat/logical-typescript-error"],
	jsdoc.configs["flat/stylistic-typescript-error"],
	jsonc.configs["flat/recommended-with-json"],
	markdown.configs.recommended,
	n.configs["flat/recommended"],
	packageJson,
	perfectionist.configs["recommended-natural"],
	regexp.configs["flat/recommended"],
	{
		extends: [
			tseslint.configs.strictTypeChecked,
			tseslint.configs.stylisticTypeChecked,
		],
		files: ["**/*.js", "**/*.ts"],
		languageOptions: {
			parserOptions: {
				projectService: {
					allowDefaultProject: ["*.config.*s", "bin/index.js"],
				},
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			// These on-by-default rules work well for this repo if configured
			"@typescript-eslint/prefer-nullish-coalescing": [
				"error",
				{ ignorePrimitives: true },
			],
			"@typescript-eslint/restrict-template-expressions": [
				"error",
				{ allowBoolean: true, allowNullish: true, allowNumber: true },
			],

			// Stylistic concerns that don't interfere with Prettier
			"logical-assignment-operators": [
				"error",
				"always",
				{ enforceForIfStatements: true },
			],
			"no-useless-rename": "error",
			"object-shorthand": "error",
			"operator-assignment": "error",
		},
		settings: { perfectionist: { partitionByComment: true, type: "natural" } },
	},
	{ extends: [tseslint.configs.disableTypeChecked], files: ["**/*.md/*.ts"] },
	{
		extends: [vitest.configs.recommended],
		files: ["**/*.test.*"],
		rules: { "@typescript-eslint/no-unsafe-assignment": "off" },
	},
	{
		extends: [yml.configs["flat/recommended"], yml.configs["flat/prettier"]],
		files: ["**/*.{yml,yaml}"],
		rules: {
			"yml/file-extension": ["error", { extension: "yml" }],
			"yml/sort-keys": [
				"error",
				{ order: { type: "asc" }, pathPattern: "^.*$" },
			],
			"yml/sort-sequence-values": [
				"error",
				{ order: { type: "asc" }, pathPattern: "^.*$" },
			],
		},
	},
);
