import { base } from "../base.ts";
import { blockESLint } from "./blockESLint.ts";
import { getScriptFileExtension } from "./eslint/getScriptFileExtension.ts";

export const stylisticComment =
	"Stylistic concerns that don't interfere with Prettier";

export const blockESLintMoreStyling = base.createBlock({
	about: {
		name: "ESLint More Styling",
	},
	produce({ options }) {
		return {
			addons: [
				blockESLint({
					extensions: [
						{
							files: [getScriptFileExtension(options)],
							rules: [
								{
									comment: stylisticComment,
									entries: {
										"logical-assignment-operators": [
											"error",
											"always",
											{ enforceForIfStatements: true },
										],
										"no-useless-rename": "error",
										"object-shorthand": "error",
										"operator-assignment": "error",
									},
								},
							],
						},
					],
				}),
			],
		};
	},
});
