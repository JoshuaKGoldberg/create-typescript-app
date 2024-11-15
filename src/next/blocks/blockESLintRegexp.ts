import { schema } from "../schema.js";
import { blockESLint } from "./blockESLint.js";

export const blockESLintRegexp = schema.createBlock({
	about: {
		name: "ESLint Regexp Plugin",
	},
	produce() {
		return {
			addons: [
				blockESLint({
					extensions: [`regexp.configs["flat/recommended"]`],
					imports: [
						{ source: "eslint-plugin-regexp", specifier: "* as regexp" },
					],
				}),
			],
		};
	},
});
