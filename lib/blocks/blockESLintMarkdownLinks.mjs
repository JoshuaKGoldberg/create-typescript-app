import { base } from "../base.mjs";
import { blockESLint } from "./blockESLint.mjs";
//#region src/blocks/blockESLintMarkdownLinks.ts
const blockESLintMarkdownLinks = base.createBlock({
	about: { name: "ESLint Markdown Links Plugin" },
	produce() {
		return { addons: [blockESLint({
			extensions: [{
				extends: ["markdownLinks.configs.recommended"],
				files: ["**/*.md"]
			}],
			imports: [{
				source: "eslint-plugin-markdown-links",
				specifier: "markdownLinks"
			}]
		})] };
	}
});
//#endregion
export { blockESLintMarkdownLinks };
