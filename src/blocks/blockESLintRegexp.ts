import { base } from "../base.js";
import { blockESLint } from "./blockESLint.js";
import { getScriptFileExtension } from "./eslint/getScriptFileExtension.js";

export const blockESLintRegexp = base.createBlock({
	about: {
		name: "ESLint Regexp Plugin",
	},
	produce({ options }) {
		return {
			addons: [
				blockESLint({
					extensions: [
						{
							extends: [`regexp.configs["flat/recommended"]`],
							files: [getScriptFileExtension(options)],
						},
					],
					imports: [
						{ source: "eslint-plugin-regexp", specifier: "* as regexp" },
					],
				}),
			],
		};
	},
});
