import { schema } from "../schema.js";
import { blockESLint } from "./blockESLint.js";

export const blockESLintPackageJson = schema.createBlock({
	about: {
		name: "ESLint package.json Plugin",
	},
	produce() {
		return {
			addons: [
				blockESLint({
					extensions: ["packageJson"],
					imports: [
						{
							source: "eslint-plugin-package-json/configs/recommended",
							specifier: "packageJson",
						},
					],
				}),
			],
		};
	},
});
