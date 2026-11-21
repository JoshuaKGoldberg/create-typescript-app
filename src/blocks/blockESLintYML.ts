import { base } from "../base.ts";
import { blockESLint } from "./blockESLint.ts";

export const blockESLintYML = base.createBlock({
	about: {
		name: "ESLint YML Plugin",
	},
	produce() {
		return {
			extensions: [
				blockESLint({
					extensions: [
						{
							extends: [
								'yml.configs["flat/standard"]',
								'yml.configs["flat/prettier"]',
							],
							files: ["**/*.{yml,yaml}"],
							rules: {
								"yml/file-extension": "error",
								"yml/sort-keys": "error",
								"yml/sort-sequence-values": [
									"error",
									{
										order: { type: "asc" },
										pathPattern: "^.*$",
									},
								],
							},
						},
					],
					imports: [{ source: "eslint-plugin-yml", specifier: "yml" }],
				}),
			],
		};
	},
});
