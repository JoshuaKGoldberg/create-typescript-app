import { describe, expect, it } from "vitest";

import { blockESLintIntake } from "./blockESLintIntake.ts";

describe(blockESLintIntake, () => {
	it("returns undefined when the config is not a tseslint.config call", () => {
		const actual = blockESLintIntake(`export default [];`);

		expect(actual).toBeUndefined();
	});

	it("returns only ignores when the config has a rules object", () => {
		const actual = blockESLintIntake(`import tseslint from "typescript-eslint";

export default tseslint.config(
	{ ignores: ["lib", "node_modules"] },
	{
		extends: [],
		files: ["**/*.{js,ts}"],
		languageOptions: {},
		rules: {
			"no-console": "error",
		},
		settings: {},
	},
);
`);

		expect(actual).toEqual({ ignores: ["lib", "node_modules"] });
	});
});
