import { base } from "../base.ts";
import { blockESLint } from "./blockESLint.ts";
import { getScriptFileExtension } from "./eslint/getScriptFileExtension.ts";

export const blockESLintJSDoc = base.createBlock({
	about: {
		name: "ESLint JSDoc Plugin",
	},
	produce({ options }) {
		return {
			addons: [
				blockESLint({
					extensions: [
						{
							extends: [
								'jsdoc.configs["flat/contents-typescript-error"]',
								'jsdoc.configs["flat/logical-typescript-error"]',
								'jsdoc.configs["flat/stylistic-typescript-error"]',
							],
							files: [getScriptFileExtension(options)],
						},
					],
					imports: [{ source: "eslint-plugin-jsdoc", specifier: "jsdoc" }],
				}),
			],
		};
	},
});
