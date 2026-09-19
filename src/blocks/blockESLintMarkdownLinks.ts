import { base } from "../base.js";
import { blockESLint } from "./blockESLint.js";

export const blockESLintMarkdownLinks = base.createBlock({
	about: {
		name: "ESLint Markdown Links Plugin",
	},
	produce() {
		return {
			addons: [
				blockESLint({
					extensions: [
						{
							extends: ["markdownLinks.configs.recommended"],
							files: ["**/*.md"],
						},
					],
					imports: [
						{
							source: "eslint-plugin-markdown-links",
							specifier: "markdownLinks",
						},
					],
				}),
			],
		};
	},
});
