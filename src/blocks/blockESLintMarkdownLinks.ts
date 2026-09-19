import { base } from "../base.ts";
import { blockESLint } from "./blockESLint.ts";

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
