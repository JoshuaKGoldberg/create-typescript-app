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
					extensions: [
						{
							extends: [`perfectionist.configs["recommended-natural"]`],
							files: ["**/*.{js,ts}"],
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
