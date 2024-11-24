import { base } from "../base.js";
import { blockESLint } from "./blockESLint.js";

export const blockESLintMoreStyling = base.createBlock({
	about: {
		name: "ESLint More Styling",
	},
	produce() {
		return {
			addons: [
				blockESLint({
					rules: [
						{
							comment:
								"These off-by-default rules work well for this repo and we like them on.",
							entries: {
								"logical-assignment-operators": [
									"error",
									"always",
									{ enforceForIfStatements: true },
								],
								"operator-assignment": "error",
							},
						},
						{
							comment: "Stylistic concerns that don't interfere with Prettier",
							entries: {
								"no-useless-rename": "error",
								"object-shorthand": "error",
							},
						},
					],
				}),
			],
		};
	},
});
