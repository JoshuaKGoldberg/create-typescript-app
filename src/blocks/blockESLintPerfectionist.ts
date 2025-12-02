import { base } from "../base.js";
import { blockESLint } from "./blockESLint.js";
import { getScriptFileExtension } from "./eslint/getScriptFileExtension.js";

export const blockESLintPerfectionist = base.createBlock({
	about: {
		name: "ESLint Perfectionist Plugin",
	},
	produce({ options }) {
		return {
			addons: [
				blockESLint({
					extensions: [
						{
							extends: [`perfectionist.configs["recommended-natural"]`],
							files: [getScriptFileExtension(options)],
							settings: {
								perfectionist: {
									partitionByComment: true,
									type: "natural",
								},
							},
						},
					],
					imports: [
						{
							source: "eslint-plugin-perfectionist",
							specifier: "perfectionist",
						},
					],
				}),
			],
		};
	},
});
