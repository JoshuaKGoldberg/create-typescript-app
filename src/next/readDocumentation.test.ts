import { describe, expect, it } from "vitest";

import { readDocumentation } from "./readDocumentation.js";

describe("finalize", () => {
	it("returns undefined when no .github/DEVELOPMENT.md exists", async () => {
		const documentation = await readDocumentation(() =>
			Promise.resolve(undefined),
		);

		expect(documentation).toBeUndefined();
	});

	it("filters known headings when .github/DEVELOPMENT.md exists", async () => {
		const documentation = await readDocumentation(() =>
			Promise.resolve(`# Development\nremoved\n\n## Unknown\n\nKept.\n`),
		);

		expect(documentation).toMatchInlineSnapshot(`
			"## Unknown

			Kept.
			"
		`);
	});
});
