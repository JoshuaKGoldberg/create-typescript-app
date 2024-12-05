import { Options } from "../../../shared/types.js";
import { formatTypeScript } from "./formatters/formatTypeScript.js";

export async function createESLintConfig(options: Options) {
	const tseslintBase = options.excludeLintStrict ? "recommended" : "strict";

	const imports = [
		!options.excludeLintESLint &&
			`import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";`,
		`import eslint from "@eslint/js";`,
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
		!options.excludeLintESLint && `	comments.recommended,`,
		!options.excludeLintJSDoc &&
			`	jsdoc.configs["flat/contents-typescript-error"],
		jsdoc.configs["flat/logical-typescript-error"],
		jsdoc.configs["flat/stylistic-typescript-error"],`,
		!options.excludeLintJson && `	jsonc.configs["flat/recommended-with-json"],`,
		!options.excludeLintMd && `	markdown.configs.recommended,`,
		`	n.configs["flat/recommended"],`,
		!options.excludeLintPackageJson && `	packageJson,`,
		!options.excludeLintPerfectionist &&
			`	perfectionist.configs["recommended-natural"],`,
		!options.excludeLintRegex && `	regexp.configs["flat/recommended"],`,
	].filter(Boolean);

	const ignores = [
		...(options.excludeTests ? [] : ["**/*.snap", "coverage"]),
		"lib",
		"node_modules",
		"pnpm-lock.yaml",
	]
		.map((ignore) => JSON.stringify(ignore))
		.sort();

	const rules =
		!options.excludeLintStylistic &&
		`{
			// Stylistic concerns that don't interfere with Prettier
			"logical-assignment-operators": [
				"error",
				"always",
				{ enforceForIfStatements: true },
			],
			"no-useless-rename": "error",
			"object-shorthand": "error",
			"operator-assignment": "error",
		}`;

	return await formatTypeScript(`${imports.join("\n")}

export default tseslint.config(
	{ ignores: [${ignores.join(", ")}], },
	{ linterOptions: { reportUnusedDisableDirectives: "error" } },
	${elements.join("\n")}
	{
		extends: ${
			options.excludeLintStylistic
				? `tseslint.configs.${tseslintBase}TypeChecked`
				: `[
			tseslint.configs.${tseslintBase}TypeChecked,
			tseslint.configs.stylisticTypeChecked,
		]`
		},
		files: ["**/*.js", "**/*.ts"],
		languageOptions: {
			parserOptions: {
				projectService: { allowDefaultProject: ["*.config.*s"] },
				tsconfigRootDir: import.meta.dirname
			},
		},${
			rules
				? `
		rules: ${rules},`
				: ""
		}${
			options.excludeLintPerfectionist
				? ""
				: `
		settings: { perfectionist: { partitionByComment: true, type: "natural" } },`
		}
	},
	{
		extends: [tseslint.configs.disableTypeChecked],
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
		extends: [vitest.configs.recommended],
		files: ["**/*.test.*"],
		rules: { "@typescript-eslint/no-unsafe-assignment": "off" },
	},`
	}${
		options.excludeLintYml
			? ""
			: `
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
	},`
	}
);
`);
}
