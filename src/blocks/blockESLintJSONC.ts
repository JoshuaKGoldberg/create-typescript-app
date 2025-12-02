import { base } from "../base.js";
import { blockESLint } from "./blockESLint.js";

export const blockESLintJSONC = base.createBlock({
	about: {
		name: "ESLint JSONC Plugin",
	},
	produce() {
		return {
			addons: [
				blockESLint({
					extensions: [
						{
							extends: [`jsonc.configs["flat/recommended-with-json"]`],
							files: ["**/*.json"],
						},
					],
					imports: [{ source: "eslint-plugin-jsonc", specifier: "jsonc" }],
				}),
			],
		};
	},
});
