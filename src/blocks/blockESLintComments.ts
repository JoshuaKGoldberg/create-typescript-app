import { base } from "../base.ts";
import { blockESLint } from "./blockESLint.ts";
import { getScriptFileExtension } from "./eslint/getScriptFileExtension.ts";

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
