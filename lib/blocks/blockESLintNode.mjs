import { base } from "../base.mjs";
import { getScriptFileExtension } from "./eslint/getScriptFileExtension.mjs";
import { blockESLint } from "./blockESLint.mjs";
//#region src/blocks/blockESLintNode.ts
const blockESLintNode = base.createBlock({
	about: { name: "ESLint Node Plugin" },
	produce({ options }) {
		return { addons: [blockESLint({
			extensions: [
				{
					extends: ["n.configs[\"flat/recommended\"]"],
					files: [getScriptFileExtension(options)]
				},
				{
					extends: ["tseslint.configs.disableTypeChecked"],
					files: ["**/*.md/*.ts"],
					rules: { "n/no-missing-import": "off" }
				},
				{
					files: ["**/*.test.*", "eslint.config.*"],
					rules: { "n/no-unsupported-features/node-builtins": "off" }
				}
			],
			imports: [{
				source: "eslint-plugin-n",
				specifier: "n"
			}]
		})] };
	}
});
//#endregion
export { blockESLintNode };
