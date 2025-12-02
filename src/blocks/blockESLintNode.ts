import { base } from "../base.js";
import { blockESLint } from "./blockESLint.js";
import { getScriptFileExtension } from "./eslint/getScriptFileExtension.js";

export const blockESLintNode = base.createBlock({
	about: {
		name: "ESLint Node Plugin",
	},
	produce({ options }) {
		return {
			addons: [
				blockESLint({
					extensions: [
						{
							extends: ['n.configs["flat/recommended"]'],
							files: [getScriptFileExtension(options)],
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
							rules: { "n/no-missing-import": "off" },
						},
					],
					imports: [{ source: "eslint-plugin-n", specifier: "n" }],
				}),
			],
		};
	},
});
