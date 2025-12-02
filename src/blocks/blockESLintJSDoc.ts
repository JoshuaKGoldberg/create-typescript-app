import { base } from "../base.js";
import { blockESLint } from "./blockESLint.js";

export const blockESLintJSDoc = base.createBlock({
	about: {
		name: "ESLint JSDoc Plugin",
	},
	produce() {
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
							files: ["**/*.{js,ts}"],
						},
					],
					imports: [{ source: "eslint-plugin-jsdoc", specifier: "jsdoc" }],
				}),
			],
		};
	},
});
