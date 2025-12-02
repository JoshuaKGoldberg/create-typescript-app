import { base } from "../base.js";
import { blockESLint } from "./blockESLint.js";
import { getScriptFileExtension } from "./eslint/getScriptFileExtension.js";

export const blockESLintComments = base.createBlock({
	about: {
		name: "ESLint Comments Plugin",
	},
	produce({ options }) {
		return {
			addons: [
				blockESLint({
					extensions: [
						{
							extends: ["comments.recommended"],
							files: [getScriptFileExtension(options)],
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
