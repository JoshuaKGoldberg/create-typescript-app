import { base } from "../base.ts";
import { blockESLint } from "./blockESLint.ts";
import { getScriptFileExtension } from "./eslint/getScriptFileExtension.ts";

export const blockESLintRegexp = base.createBlock({
	about: {
		name: "ESLint Regexp Plugin",
	},
	produce({ options }) {
		return {
			extensions: [
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
