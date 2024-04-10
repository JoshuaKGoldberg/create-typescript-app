import { Options } from "../../../shared/types.js";
import { formatTypeScript } from "./formatters/formatTypeScript.js";

export async function createESLintConfig(options: Options) {
	const tseslintBase = options.excludeLintStrict ? "recommended" : "strict";

	const imports = [
		`import eslint from "@eslint/js";`,
		!options.excludeLintESLint &&
			`import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";`,
		!options.excludeLintDeprecation &&
			`import deprecation from "eslint-plugin-deprecation";`,
		!options.excludeLintJSDoc && `import jsdoc from "eslint-plugin-jsdoc";`,
		!options.excludeLintJson && `import jsonc from "eslint-plugin-jsonc";`,
		!options.excludeLintMd && `import markdown from "eslint-plugin-markdown";`,
		`import n from "eslint-plugin-n";`,
		!options.excludeLintPackageJson &&
			`import packageJson from "eslint-plugin-package-json/configs/recommended";`,
		!options.excludeLintPerfectionist &&
			`import perfectionistNatural from "eslint-plugin-perfectionist/configs/recommended-natural";`,
		!options.excludeLintRegex &&
			`import * as regexp from "eslint-plugin-regexp";`,
		!options.excludeTests && `import vitest from "eslint-plugin-vitest";`,
		!options.excludeLintYml && `import yml from "eslint-plugin-yml";`,
		`import tseslint from "typescript-eslint";`,
	].filter(Boolean);

	const elements = [
		`eslint.configs.recommended,`,
		!options.excludeLintJson &&
			`	...jsonc.configs["flat/recommended-with-json"],`,
		!options.excludeLintMd && `	...markdown.configs.recommended,`,
		!options.excludeLintYml && `	...yml.configs["flat/recommended"],`,
		!options.excludeLintYml && `	...yml.configs["flat/prettier"],`,
		!options.excludeLintESLint && `	comments.recommended,`,
		!options.excludeLintJSDoc &&
			`	jsdoc.configs["flat/recommended-typescript-error"],`,
		`	n.configs["flat/recommended"],`,
		!options.excludeLintPackageJson && `	packageJson,`,
		!options.excludeLintPerfectionist && `	perfectionistNatural,`,
		!options.excludeLintRegex && `	regexp.configs["flat/recommended"],`,
	].filter(Boolean);

	return await formatTypeScript(`${imports.join("\n")}

export default tseslint.config(
	{
		ignores: [${
			options.excludeTests
				? ""
				: `
			"coverage*",`
		}
			"lib",
			"node_modules",
			"pnpm-lock.yaml",
			"**/*.snap",
		],
	},
	{
		linterOptions: {
			reportUnusedDisableDirectives: "error",
		},
	},
	${elements.join("\n")}
	...${
		options.excludeLintStylistic
			? `tseslint.configs.${tseslintBase}`
			: `[...tseslint.configs.${tseslintBase}, ...tseslint.configs.stylistic]`
	}.map(
		(config) => ({
			...config,
			files: ["**/*.js", "**/*.ts"],
			rules: {
				...config.rules,
				// These off-by-default rules work well for this repo and we like them on.${
					options.excludeLintJSDoc
						? ""
						: `
				"jsdoc/informative-docs": "error",`
				}
				"logical-assignment-operators": [
					"error",
					"always",
					{ enforceForIfStatements: true },
				],
				"operator-assignment": "error",

				// These on-by-default rules don't work well for this repo and we like them off.${
					options.excludeLintJSDoc
						? ""
						: `
				"jsdoc/require-jsdoc": "off",
				"jsdoc/require-param": "off",
				"jsdoc/require-property": "off",
				"jsdoc/require-returns": "off",`
				}
				"no-case-declarations": "off",
				"no-constant-condition": "off",

				// These on-by-default rules work well for this repo if configured
				"@typescript-eslint/no-unused-vars": ["error", { caughtErrors: "all" }],
				"perfectionist/sort-objects": [
					"error",
					{
						order: "asc",
						"partition-by-comment": true,
						type: "natural",
					},
				],

				// Stylistic concerns that don't interfere with Prettier
				"no-useless-rename": "error",
				"object-shorthand": "error",
			},
		}),
	),
	...[
		...tseslint.configs.strictTypeChecked,
		...tseslint.configs.stylisticTypeChecked,
	].map((config) => ({
		...config,
		files: ["**/*.ts"],
		languageOptions: {
			parserOptions: {
				project: "./tsconfig.eslint.json",
				tsconfigRootDir: import.meta.dirname,
			},
		},
		plugins: { deprecation },
		rules: {
			// These off-by-default rules work well for this repo and we like them on.
			"deprecation/deprecation": "error",

			// These on-by-default rules work well for this repo if configured
			"@typescript-eslint/no-unnecessary-condition": [
				"error",
				{
					allowConstantLoopConditions: true,
				},
			],
			"@typescript-eslint/prefer-nullish-coalescing": [
				"error",
				{ ignorePrimitives: true },
			],
		},
	})),
	{
		files: ["**/*.md/*.ts"],
		rules: {
			"n/no-missing-import": [
				"error",
				{ allowModules: ["${options.repository}"] },
			],
		},
	},${
		options.excludeTests
			? ""
			: `
	{
		files: ["**/*.test.*"],
		languageOptions: {
			globals: {
				...vitest.environments.env.globals,
			},
		},
		plugins: {
			vitest,
		},
		rules: {
			...vitest.configs.recommended.rules,

			// These on-by-default rules aren't useful in test files.
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/no-unsafe-call": "off",
		},
	},`
	}
	{
		files: ["**/*.{yml,yaml}"],
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
);
`);
}
