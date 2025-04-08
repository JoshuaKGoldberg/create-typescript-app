import { describe, expect, it } from "vitest";

import { blockESLintIntake } from "./eslint/blockESLintIntake.js";

describe(blockESLintIntake, () => {
	it.each([
		["an empty string", ""],
		["unrelated text", "other;"],
		["raw export default", "export default {}"],
		["config without arguments", "export default tseslint.config()"],
		["config with too few arguments", "export default tseslint.config({})"],
		[
			"config with a first argument that is not ignores",
			`
				export default tseslint.config(
					{ rules: {} },
					{ settings: {} },
				);
			`,
		],
		[
			"config with non-object argument",
			`
				export default tseslint.config(
					{ ignores: [] },
					other,
				);
			`,
		],
		[
			"config with object argument containing unknown properties",
			`
				export default tseslint.config(
					{ ignores: [] },
					{ other },
				);
			`,
		],
		[
			"config with object argument containing unknown computed properties",
			`
				export default tseslint.config(
					{ ignores: [] },
					{ ['other']: {} },
				);
			`,
		],
		[
			"config with object argument containing incomplete properties",
			`
				export default tseslint.config(
					{ ignores: [] },
					{ rules: {} },
				);
			`,
		],
		[
			"config with object argument containing misnamed properties",
			`
				export default tseslint.config(
					{ ignores: [] },
					{ 
						extends: {},
						files: {},
						other: {},
						rules: {},
						settings: {},
					},
				);
			`,
		],
		[
			"config with object argument containing computed rules",
			`
				export default tseslint.config(
					{ ignores: [] },
					{ 
						extends: {},
						files: {},
						languageOptions: {},
						rules: {
							[other]: {},
						},
						settings: {},
					},
				);
			`,
		],
	])("returns undefined when given %s", (_, sourceText) => {
		const actual = blockESLintIntake(sourceText);

		expect(actual).toBeUndefined();
	});

	it.each([
		[
			"rules group after linterOptions and member expression extends",
			`
export default tseslint.config(
	{ ignores: ["lib", "node_modules", "pnpm-lock.yaml"] },
	{ linterOptions: { reportUnusedDisableDirectives: "error" } },
	eslint.configs.recommended,
	comments.recommended,
	{
		extends: [tseslint.configs.strictTypeChecked],
		files: ["**/*.{js,ts}"],
		languageOptions: { /* ... */ },
		rules: {
			"@typescript-eslint/prefer-nullish-coalescing": [
				"error",
				{ ignorePrimitives: true },
			],
			"@typescript-eslint/restrict-template-expressions": [
				"error",
				{ allowBoolean: true },
			],
		},
		settings: { /* ... */ }
	}
);`,
			{
				ignores: ["lib", "node_modules", "pnpm-lock.yaml"],
				rules: [
					{
						entries: {
							"@typescript-eslint/prefer-nullish-coalescing": [
								"error",
								{ ignorePrimitives: true },
							],
							"@typescript-eslint/restrict-template-expressions": [
								"error",
								{ allowBoolean: true },
							],
						},
					},
				],
			},
		],
		[
			"non-commented group in rules",
			`
export default tseslint.config(
	{ ignores: ["lib", "node_modules", "pnpm-lock.yaml"] },
	{
		extends: [tseslint.configs.strictTypeChecked],
		files: ["**/*.{js,ts}"],
		languageOptions: { /* ... */ },
		rules: {
			"@typescript-eslint/prefer-nullish-coalescing": [
				"error",
				{ ignorePrimitives: true },
			],
			"@typescript-eslint/restrict-template-expressions": [
				"error",
				{ allowBoolean: true },
			],
		},
		settings: { /* ... */ }
	}
);`,
			{
				ignores: ["lib", "node_modules", "pnpm-lock.yaml"],
				rules: [
					{
						entries: {
							"@typescript-eslint/prefer-nullish-coalescing": [
								"error",
								{ ignorePrimitives: true },
							],
							"@typescript-eslint/restrict-template-expressions": [
								"error",
								{ allowBoolean: true },
							],
						},
					},
				],
			},
		],
		[
			"one custom commented group in rules",
			`
export default tseslint.config(
	{ ignores: ["lib", "node_modules", "pnpm-lock.yaml"] },
	{
		extends: [tseslint.configs.strictTypeChecked],
		files: ["**/*.{js,ts}"],
		languageOptions: { /* ... */ },
		rules: {
			// These on-by-default rules work well for this repo if configured
			"@typescript-eslint/prefer-nullish-coalescing": [
				"error",
				{ ignorePrimitives: true },
			],
			"@typescript-eslint/restrict-template-expressions": [
				"error",
				{ allowBoolean: true },
			],
		},
		settings: { /* ... */ }
	}
);`,
			{
				ignores: ["lib", "node_modules", "pnpm-lock.yaml"],
				rules: [
					{
						comment:
							"These on-by-default rules work well for this repo if configured",
						entries: {
							"@typescript-eslint/prefer-nullish-coalescing": [
								"error",
								{ ignorePrimitives: true },
							],
							"@typescript-eslint/restrict-template-expressions": [
								"error",
								{ allowBoolean: true },
							],
						},
					},
				],
			},
		],
		[
			"one non-commented group and one commented group in rules",
			`
export default tseslint.config(
	{ ignores: ["lib", "node_modules", "pnpm-lock.yaml"] },
	{
		extends: [tseslint.configs.strictTypeChecked],
		files: ["**/*.{js,ts}"],
		languageOptions: { /* ... */ },
		rules: {
			"@typescript-eslint/restrict-template-expressions": [
				"error",
				{ allowBoolean: true },
			],

			// These on-by-default rules work well for this repo if configured
			"@typescript-eslint/prefer-nullish-coalescing": [
				"error",
				{ ignorePrimitives: true },
			],
		},
		settings: { /* ... */ }
	}
);`,
			{
				ignores: ["lib", "node_modules", "pnpm-lock.yaml"],
				rules: [
					{
						entries: {
							"@typescript-eslint/restrict-template-expressions": [
								"error",
								{ allowBoolean: true },
							],
						},
					},
					{
						comment:
							"These on-by-default rules work well for this repo if configured",
						entries: {
							"@typescript-eslint/prefer-nullish-coalescing": [
								"error",
								{ ignorePrimitives: true },
							],
						},
					},
				],
			},
		],
		[
			"one custom commented group in rules before the stylistic comment",
			`
export default tseslint.config(
	{ ignores: ["lib"] },
	{
		extends: [tseslint.configs.strictTypeChecked],
		files: ["**/*.{js,ts}"],
		languageOptions: { /* ... */ },
		rules: {
			// These on-by-default rules work well for this repo if configured
			"@typescript-eslint/prefer-nullish-coalescing": [
				"error",
				{ ignorePrimitives: true },
			],
			"@typescript-eslint/restrict-template-expressions": [
				"error",
				{ allowBoolean: true },
			],

			// Stylistic concerns that don't interfere with Prettier
			"operator-assignment": "error",
		},
		settings: { /* ... */ }
	}
);`,
			{
				ignores: ["lib"],
				rules: [
					{
						comment:
							"These on-by-default rules work well for this repo if configured",
						entries: {
							"@typescript-eslint/prefer-nullish-coalescing": [
								"error",
								{ ignorePrimitives: true },
							],
							"@typescript-eslint/restrict-template-expressions": [
								"error",
								{ allowBoolean: true },
							],
						},
					},
				],
			},
		],
		[
			"multi-line custom commented group in rules",
			`
export default tseslint.config(
	{ ignores: ["lib"] },
	{
		extends: [tseslint.configs.strictTypeChecked],
		files: ["**/*.{js,ts}"],
		languageOptions: { /* ... */ },
		rules: {
			// First line.
			// Second line.
			// Third line.
			"@typescript-eslint/prefer-nullish-coalescing": "error"
		},
		settings: { /* ... */ }
	}
);`,
			{
				ignores: ["lib"],
				rules: [
					{
						comment: "First line.\nSecond line.\nThird line.",
						entries: {
							"@typescript-eslint/prefer-nullish-coalescing": "error",
						},
					},
				],
			},
		],
	])("returns data when given %s", (_, sourceText, expected) => {
		const actual = blockESLintIntake(sourceText);

		expect(actual).toEqual(expected);
	});
});
