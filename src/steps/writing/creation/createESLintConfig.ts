import { Options } from "../../../shared/types.js";
import { formatTypeScript } from "./formatters/formatTypeScript.js";

export async function createESLintConfig(options: Options) {
	const tseslintBase = options.excludeLintStrict ? "recommended" : "strict";

	const imports = [
		`import eslint from "@eslint/js";`,
		!options.excludeLintESLint &&
			`import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";`,
		!options.excludeTests && `import vitest from "@vitest/eslint-plugin";`,
		!options.excludeLintJSDoc && `import jsdoc from "eslint-plugin-jsdoc";`,
		!options.excludeLintJson && `import jsonc from "eslint-plugin-jsonc";`,
		!options.excludeLintMd && `import markdown from "eslint-plugin-markdown";`,
		`import n from "eslint-plugin-n";`,
		!options.excludeLintPackageJson &&
			`import packageJson from "eslint-plugin-package-json/configs/recommended";`,
		!options.excludeLintPerfectionist &&
			`import perfectionist from "eslint-plugin-perfectionist";`,
		!options.excludeLintRegex &&
			`import * as regexp from "eslint-plugin-regexp";`,
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
			`	jsdoc.configs["flat/contents-typescript-error"],
	jsdoc.configs["flat/logical-typescript-error"],
	jsdoc.configs["flat/stylistic-typescript-error"],`,
		`	n.configs["flat/recommended"],`,
		!options.excludeLintPackageJson && `	packageJson,`,
		!options.excludeLintPerfectionist &&
			`	perfectionist.configs["recommended-natural"],`,
		!options.excludeLintRegex && `	regexp.configs["flat/recommended"],`,
	].filter(Boolean);

	const rules = `{
			${
				options.excludeLintJSDoc
					? ""
					: `

			// These on-by-default rules don't work well for this repo and we like them off.
			"jsdoc/lines-before-block": "off",`
			}${
				options.excludeLintStylistic
					? ""
					: `

			// Stylistic concerns that don't interfere with Prettier
			"logical-assignment-operators": [
				"error",
				"always",
				{ enforceForIfStatements: true },
			],
			"no-useless-rename": "error",
			"object-shorthand": "error",
			"operator-assignment": "error",`
			}
		}`;

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
			"pnpm-lock.yaml",${
				options.excludeTests
					? ""
					: `
				"**/*.snap",`
			}
		],
	},
	{
		linterOptions: {
			reportUnusedDisableDirectives: "error",
		},
	},
	${elements.join("\n")}
	{
		extends: ${
			options.excludeLintStylistic
				? `tseslint.configs.${tseslintBase}TypeChecked`
				: `[
			...tseslint.configs.${tseslintBase}TypeChecked,
			...tseslint.configs.stylisticTypeChecked,
		]`
		},
		files: ["**/*.js", "**/*.ts"],
		languageOptions: {
			parserOptions: {
				projectService: {
					allowDefaultProject: ["*.config.*s"],
				},
				tsconfigRootDir: import.meta.dirname
			},
		},${
			rules.replaceAll(/\s+/g, "") === "{}"
				? ""
				: `
		rules: ${rules},`
		}${
			options.excludeLintPerfectionist
				? ""
				: `
		settings: {
			perfectionist: {
				partitionByComment: true,
				type: "natural",
			},
		},`
		}
	},
	{
		extends: [tseslint.configs.disableTypeChecked],
		files: ["**/*.md/*.ts"],
		rules: {
			"n/no-missing-import": [
				"error",
				{ allowModules: ["create-typescript-app"] },
			],
		},
	},${
		options.excludeTests
			? ""
			: `
	{
		files: ["**/*.test.*"],
		extends: [vitest.configs.recommended],
		rules: {
			// These on-by-default rules aren't useful in test files.
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/no-unsafe-call": "off",
		},
	},`
	}${
		options.excludeLintYml
			? ""
			: `
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
	},`
	}
);
`);
}
