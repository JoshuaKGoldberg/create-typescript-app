import { base } from "../base.mjs";
import { getScriptFileExtension } from "./eslint/getScriptFileExtension.mjs";
import { blockESLint } from "./blockESLint.mjs";
//#region src/blocks/blockESLintPerfectionist.ts
const blockESLintPerfectionist = base.createBlock({
	about: { name: "ESLint Perfectionist Plugin" },
	produce({ options }) {
		return { addons: [blockESLint({
			extensions: [{
				extends: [`perfectionist.configs["recommended-natural"]`],
				files: [getScriptFileExtension(options)],
				settings: { perfectionist: {
					partitionByComment: true,
					type: "natural"
				} }
			}],
			imports: [{
				source: "eslint-plugin-perfectionist",
				specifier: "perfectionist"
			}]
		})] };
	}
});
//#endregion
export { blockESLintPerfectionist };
