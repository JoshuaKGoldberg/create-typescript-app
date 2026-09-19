import { base } from "../base.mjs";
import { getScriptFileExtension } from "./eslint/getScriptFileExtension.mjs";
import { blockESLint } from "./blockESLint.mjs";
//#region src/blocks/blockESLintRegexp.ts
const blockESLintRegexp = base.createBlock({
	about: { name: "ESLint Regexp Plugin" },
	produce({ options }) {
		return { addons: [blockESLint({
			extensions: [{
				extends: [`regexp.configs["flat/recommended"]`],
				files: [getScriptFileExtension(options)]
			}],
			imports: [{
				source: "eslint-plugin-regexp",
				specifier: "* as regexp"
			}]
		})] };
	}
});
//#endregion
export { blockESLintRegexp };
