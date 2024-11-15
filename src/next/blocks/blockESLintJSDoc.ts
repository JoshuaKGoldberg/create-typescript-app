import { schema } from "../schema.js";
import { blockESLint } from "./blockESLint.js";

export const blockESLintJSDoc = schema.createBlock({
	about: {
		name: "ESLint JSDoc Plugin",
	},
	produce() {
		return {
			addons: [
				blockESLint({
					extensions: [
						'jsdoc.configs["flat/contents-typescript-error"]',
						'jsdoc.configs["flat/logical-typescript-error"]',
						'jsdoc.configs["flat/stylistic-typescript-error"]',
					],
					imports: [{ source: "eslint-plugin-jsdoc", specifier: "jsdoc" }],
					rules: [
						{
							comment:
								"These on-by-default rules don't work well for this repo and we like them off.",
							entries: {
								"jsdoc/lines-before-block": "off",
							},
						},
					],
				}),
			],
		};
	},
});
