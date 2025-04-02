import { describe, expect, it } from "vitest";

import { readDevelopmentDocumentation } from "./readDevelopmentDocumentation.js";

describe(readDevelopmentDocumentation, () => {
	it("returns undefined when no .github/DEVELOPMENT.md exists", async () => {
		const documentation = await readDevelopmentDocumentation(() =>
			Promise.resolve(undefined),
		);

		expect(documentation).toBeUndefined();
	});

	it("filters known headings when .github/DEVELOPMENT.md exists", async () => {
		const documentation = await readDevelopmentDocumentation(() =>
			Promise.resolve(`# Development\nremoved\n\n## Unknown\n\nKept.\n`),
		);

		expect(documentation).toMatchInlineSnapshot(`
			"## Unknown

			Kept.
			"
		`);
	});
});
