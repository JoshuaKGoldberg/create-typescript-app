import { base } from "../base.js";
import { blockESLint } from "./blockESLint.js";

export const blockESLintPerfectionist = base.createBlock({
	about: {
		name: "ESLint Perfectionist Plugin",
	},
	produce() {
		return {
			addons: [
				blockESLint({
					extensions: [`perfectionist.configs["recommended-natural"]`],
					imports: [
						{
							source: "eslint-plugin-perfectionist",
							specifier: "perfectionist",
						},
					],
					rules: [
						{
							comment:
								"These on-by-default rules work well for this repo if configured.",
							entries: {
								"perfectionist/sort-objects": [
									"error",
									{
										order: "asc",
										partitionByComment: true,
										type: "natural",
									},
								],
							},
						},
					],
				}),
			],
		};
	},
});
