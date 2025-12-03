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
							rules: [
								{
									comment: "https://github.com/eslint/markdown/issues/294",
									entries: {
										"markdown/no-missing-label-refs": "off",
									},
								},
							],
						},
					],
					imports: [
						{
							source: "@eslint/markdown",
							specifier: "markdown",
						},
					],
				}),
			],
		};
	},
});
