import { schema } from "../schema.js";
import { blockESLint } from "./blockESLint.js";

export const blockESLintNode = schema.createBlock({
	about: {
		name: "ESLint Node Plugin",
	},
	produce({ options }) {
		return {
			addons: [
				blockESLint({
					extensions: [
						'n.configs["flat/recommended"]',
						{
							extends: ["tseslint.configs.disableTypeChecked"],
							files: ["**/*.md/*.ts"],
							rules: {
								"n/no-missing-import": [
									"error",
									{ allowModules: [options.repository] },
								],
							},
						},
					],
					imports: [{ source: "eslint-plugin-n", specifier: "n" }],
				}),
			],
		};
	},
});
