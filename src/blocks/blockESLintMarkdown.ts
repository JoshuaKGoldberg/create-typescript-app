import { base } from "../base.js";
import { blockESLint } from "./blockESLint.js";

export const blockESLintMarkdown = base.createBlock({
	about: {
		name: "ESLint Markdown Plugin",
	},
	produce() {
		return {
			addons: [
				blockESLint({
					extensions: [
						{
							extends: ["markdown.configs.recommended"],
							files: ["**/*.md"],
						},
					],
					imports: [
						{
							source: "eslint-plugin-markdown",
							specifier: "markdown",
							types: true,
						},
					],
				}),
			],
		};
	},
});
