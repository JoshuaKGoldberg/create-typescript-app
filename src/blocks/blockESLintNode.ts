import { base } from "../base.js";
import { blockESLint } from "./blockESLint.js";

export const blockESLintNode = base.createBlock({
	about: {
		name: "ESLint Node Plugin",
	},
	produce() {
		return {
			addons: [
				blockESLint({
					extensions: [
						{
							extends: ['n.configs["flat/recommended"]'],
							files: ["**/*.js", "**/*.ts"],
							rules: [
								{
									comment:
										"https://github.com/eslint-community/eslint-plugin-n/issues/472",
									entries: {
										"n/no-unpublished-bin": "off",
									},
								},
							],
						},
						{
							extends: ["tseslint.configs.disableTypeChecked"],
							files: ["**/*.md/*.ts"],
							rules: [
								{
									entries: {
										"n/no-missing-import": "off",
									},
								},
							],
						},
					],
					imports: [{ source: "eslint-plugin-n", specifier: "n" }],
				}),
			],
		};
	},
});
