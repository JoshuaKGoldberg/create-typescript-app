import { base } from "../base.ts";
import { blockESLint } from "./blockESLint.ts";
import { getScriptFileExtension } from "./eslint/getScriptFileExtension.ts";

export const blockESLintUnicorn = base.createBlock({
	about: {
		name: "ESLint Unicorn Plugin",
	},
	produce({ options }) {
		return {
			addons: [
				blockESLint({
					extensions: [
						{
							extends: ["unicorn.configs.unopinionated"],
							files: [getScriptFileExtension(options)],
							rules: [
								{
									comment:
										"Sorting strings by code unit is intentional, and this rule isn't type-aware",
									entries: { "unicorn/require-array-sort-compare": "off" },
								},
							],
						},
						{
							files: ["*.config.*"],
							rules: { "unicorn/no-top-level-side-effects": "off" },
						},
					],
					imports: [{ source: "eslint-plugin-unicorn", specifier: "unicorn" }],
				}),
			],
		};
	},
});
