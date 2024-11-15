import { schema } from "../schema.js";
import { blockESLint } from "./blockESLint.js";

export const blockESLintMarkdown = schema.createBlock({
	about: {
		name: "ESLint Markdown Plugin",
	},
	produce() {
		return {
			addons: [
				blockESLint({
					extensions: ["...markdown.configs.recommended"],
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
