import { schema } from "../schema.js";
import { blockESLint } from "./blockESLint.js";

export const blockESLintComments = schema.createBlock({
	about: {
		name: "ESLint Comments Plugin",
	},
	produce() {
		return {
			addons: [
				blockESLint({
					extensions: ["comments.recommended"],
					imports: [
						{
							source: "@eslint-community/eslint-plugin-eslint-comments/configs",
							specifier: "comments",
						},
					],
				}),
			],
		};
	},
});
