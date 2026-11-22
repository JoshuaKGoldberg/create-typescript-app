import { describe, expect, it } from "vitest";

import { blockESLintIntake } from "./eslint/blockESLintIntake.ts";

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
			"config with object argument containing non-array files",
			`
				export default tseslint.config(
					{ ignores: [] },
					{
						extends: [],
						files: pattern,
						languageOptions: {},
						rules: {},
						settings: {},
					},
				);
			`,
		],
		[
			"config with object argument containing non-object rules",
			`
				export default tseslint.config(
					{ ignores: [] },
					{
						extends: [],
						files: ["**/*.ts"],
						languageOptions: {},
						rules: other,
						settings: {},
					},
				);
			`,
		],
		[
			"config with object argument containing an invalid rule entry",
			`
				export default tseslint.config(
					{ ignores: [] },
					{
						extends: [],
						files: ["**/*.ts"],
						languageOptions: {},
						rules: { "no-console": "sometimes" },
						settings: {},
					},
				);
			`,
		],
		[
			"config with object argument containing a non-literal rule name",
			`
				export default tseslint.config(
					{ ignores: [] },
					{
						extends: [],
						files: ["**/*.ts"],
						languageOptions: {},
						rules: { [ruleName]: "error" },
						settings: {},
					},
				);
			`,
		],
		[
			"config with object argument containing non-literal files",
			`
				export default tseslint.config(
					{ ignores: [] },
					{
						extends: [],
						files: [pattern],
						languageOptions: {},
						rules: {},
						settings: {},
					},
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
		[
			"config with non-literal ignores",
			`
				export default tseslint.config(
					{ ignores: [other] },
					{
						extends: [],
						files: ["**/*.ts"],
						languageOptions: {},
						rules: {},
						settings: {},
					},
				);
			`,
		],
		[
			"defineConfig with empty globalIgnores",
			`
				export default defineConfig(
					globalIgnores(),
					{
						extends: [],
						files: ["**/*.{js,ts}"],
						languageOptions: {},
						rules: {},
						settings: {},
					},
				);
			`,
		],
		[
			"defineConfig with non-literal globalIgnores",
			`
				export default defineConfig(
					globalIgnores(ignores, "Global Ignores"),
					{
						extends: [],
						files: ["**/*.{js,ts}"],
						languageOptions: {},
						rules: {},
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
				extensions: [
					{
						files: ["**/*.{js,ts}"],
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
				ignores: ["lib", "node_modules", "pnpm-lock.yaml"],
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
				extensions: [
					{
						files: ["**/*.{js,ts}"],
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
				ignores: ["lib", "node_modules", "pnpm-lock.yaml"],
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
				extensions: [
					{
						files: ["**/*.{js,ts}"],
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
				ignores: ["lib", "node_modules", "pnpm-lock.yaml"],
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
				extensions: [
					{
						files: ["**/*.{js,ts}"],
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
				ignores: ["lib", "node_modules", "pnpm-lock.yaml"],
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
				extensions: [
					{
						files: ["**/*.{js,ts}"],
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
				ignores: ["lib"],
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
				extensions: [
					{
						files: ["**/*.{js,ts}"],
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
				ignores: ["lib"],
			},
		],
		[
			"empty rules",
			`export default tseslint.config(
	{ ignores: ["lib"] },
	{
		extends: [tseslint.configs.strictTypeChecked],
		files: ["**/*.{js,ts}"],
		languageOptions: {},
		rules: {},
		settings: {}
	}
);`,
			{
				extensions: [],
				ignores: ["lib"],
			},
		],
		[
			"defineConfig with globalIgnores",
			`
export default defineConfig(
	globalIgnores(["lib", "node_modules", "pnpm-lock.yaml"], "Global Ignores"),
	{ linterOptions: { reportUnusedDisableDirectives: "error" } },
	{
		extends: [comments.recommended, tseslint.configs.strictTypeChecked],
		files: ["**/*.{js,ts}"],
		languageOptions: { /* ... */ },
		rules: {
			"@typescript-eslint/consistent-indexed-object-style": "off",

			// Stylistic concerns that don't interfere with Prettier
			"operator-assignment": "error",
		},
		settings: { /* ... */ }
	},
	{
		extends: [jsonc.configs["flat/recommended-with-json"]],
		files: ["**/*.json"],
	},
);`,
			{
				extensions: [
					{
						files: ["**/*.{js,ts}"],
						rules: [
							{
								entries: {
									"@typescript-eslint/consistent-indexed-object-style": "off",
								},
							},
						],
					},
				],
				ignores: ["lib", "node_modules", "pnpm-lock.yaml"],
			},
		],
		[
			"defineConfig with an ignores object",
			`
export default defineConfig(
	{ ignores: ["lib"] },
	{
		extends: [tseslint.configs.strictTypeChecked],
		files: ["**/*.{js,ts}"],
		languageOptions: { /* ... */ },
		rules: {
			"@typescript-eslint/no-dynamic-delete": "off",
		},
		settings: { /* ... */ }
	}
);`,
			{
				extensions: [
					{
						files: ["**/*.{js,ts}"],
						rules: [
							{
								entries: {
									"@typescript-eslint/no-dynamic-delete": "off",
								},
							},
						],
					},
				],
				ignores: ["lib"],
			},
		],
		[
			"defineConfig with only the stylistic group in rules",
			`
export default defineConfig(
	globalIgnores(["lib"], "Global Ignores"),
	{
		extends: [tseslint.configs.strictTypeChecked],
		files: ["**/*.{js,ts}"],
		languageOptions: { /* ... */ },
		rules: {
			// Stylistic concerns that don't interfere with Prettier
			"operator-assignment": "error",
		},
		settings: { /* ... */ }
	}
);`,
			{
				extensions: [],
				ignores: ["lib"],
			},
		],
		[
			"custom commented group in rules after the stylistic comment",
			`
export default defineConfig(
	globalIgnores(["lib"], "Global Ignores"),
	{
		extends: [tseslint.configs.strictTypeChecked],
		files: ["**/*.{js,ts}"],
		languageOptions: { /* ... */ },
		rules: {
			// Stylistic concerns that don't interfere with Prettier
			"no-useless-rename": "error",
			"operator-assignment": "error",

			// https://github.com/eslint-community/eslint-plugin-n/issues/472
			"n/no-unpublished-bin": "off",
		},
		settings: { /* ... */ }
	}
);`,
			{
				extensions: [
					{
						files: ["**/*.{js,ts}"],
						rules: [
							{
								comment:
									"https://github.com/eslint-community/eslint-plugin-n/issues/472",
								entries: {
									"n/no-unpublished-bin": "off",
								},
							},
						],
					},
				],
				ignores: ["lib"],
			},
		],
	])("returns data when given %s", (_, sourceText, expected) => {
		const actual = blockESLintIntake(sourceText);

		expect(actual).toEqual(expected);
	});
});
