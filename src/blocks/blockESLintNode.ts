import { base } from "../base.ts";
import { blockESLint } from "./blockESLint.ts";
import { getScriptFileExtension } from "./eslint/getScriptFileExtension.ts";

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
						},
						{
							extends: ["tseslint.configs.disableTypeChecked"],
							files: ["**/*.md/*.ts"],
							rules: { "n/no-missing-import": "off" },
						},
						{
							files: ["**/*.test.*", "eslint.config.*"],
							rules: { "n/no-unsupported-features/node-builtins": "off" },
						},
					],
					imports: [{ source: "eslint-plugin-n", specifier: "n" }],
				}),
			],
		};
	},
});
