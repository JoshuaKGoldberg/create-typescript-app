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
						'n.configs["flat/recommended"]',
						{
							extends: ["tseslint.configs.disableTypeChecked"],
							files: ["**/*.md/*.ts"],
							rules: [
								{
									entries: {
										"n/no-missing-import": "off",
									},
								},
								{
									comment:
										"https://github.com/eslint-community/eslint-plugin-n/issues/472",
									entries: {
										"n/no-unpublished-bin": "off",
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
