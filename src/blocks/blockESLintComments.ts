import { base } from "../base.js";
import { blockESLint } from "./blockESLint.js";

export const blockESLintComments = base.createBlock({
	about: {
		name: "ESLint Comments Plugin",
	},
	produce() {
		return {
			addons: [
				blockESLint({
					extensions: [
						{
							extends: ["comments.recommended"],
							files: ["**/*.{js,ts}"],
						},
					],
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
