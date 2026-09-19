import { base } from "../base.mjs";
import { getScriptFileExtension } from "./eslint/getScriptFileExtension.mjs";
import { blockESLint } from "./blockESLint.mjs";
//#region src/blocks/blockESLintComments.ts
const blockESLintComments = base.createBlock({
	about: { name: "ESLint Comments Plugin" },
	produce({ options }) {
		return { addons: [blockESLint({
			extensions: [{
				extends: ["comments.recommended"],
				files: [getScriptFileExtension(options)]
			}],
			imports: [{
				source: "@eslint-community/eslint-plugin-eslint-comments/configs",
				specifier: "comments"
			}]
		})] };
	}
});
//#endregion
export { blockESLintComments };
