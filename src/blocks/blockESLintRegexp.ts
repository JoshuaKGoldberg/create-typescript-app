import { base } from "../base.js";
import { blockESLint } from "./blockESLint.js";

export const blockESLintRegexp = base.createBlock({
	about: {
		name: "ESLint Regexp Plugin",
	},
	produce() {
		return {
			addons: [
				blockESLint({
					extensions: [
						{
							extends: [`regexp.configs["flat/recommended"]`],
							files: ["**/*.{js,ts}"],
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
