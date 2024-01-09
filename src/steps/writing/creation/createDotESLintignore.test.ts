import { describe, expect, it } from "vitest";

import { createDotESLintignore } from "./createDotESLintignore.js";

describe("createDotESLintignore", () => {
	it("creates an ignore file with coverage when excludeTests is false", () => {
		const actual = createDotESLintignore({ excludeTests: false });

		expect(actual).toMatchInlineSnapshot(`
			"!.*
			coverage
			lib
			node_modules
			pnpm-lock.yaml
			"
		`);
	});

	it("creates an ignore file without coverage when excludeTests is true", () => {
		const actual = createDotESLintignore({ excludeTests: true });

		expect(actual).toMatchInlineSnapshot(`
			"!.*
			lib
			node_modules
			pnpm-lock.yaml
			"
		`);
	});
});
