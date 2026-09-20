import { base } from "../base.ts";
import { blockESLint } from "./blockESLint.ts";
import { getScriptFileExtension } from "./eslint/getScriptFileExtension.ts";

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
