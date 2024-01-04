import { describe, expect, it } from "vitest";

import { createDotGitignore } from "./createDotGitignore.js";

describe("createDotGitignore", () => {
	it("creates an ignore file with coverage when excludeTests is false", () => {
		const actual = createDotGitignore({ excludeTests: false });

		expect(actual).toMatchInlineSnapshot(`
			"coverage/
			lib/
			node_modules/
			"
		`);
	});

	it("creates an ignore file without coverage when excludeTests is true", () => {
		const actual = createDotGitignore({ excludeTests: true });

		expect(actual).toMatchInlineSnapshot(`
			"lib/
			node_modules/
			"
		`);
	});
});
