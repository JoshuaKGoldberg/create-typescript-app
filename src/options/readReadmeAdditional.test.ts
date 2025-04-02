import { describe, expect, it } from "vitest";

import { readReadmeAdditional } from "./readReadmeAdditional.js";

describe(readReadmeAdditional, () => {
	it("returns undefined when there is no existing readme content", async () => {
		const getReadme = () => Promise.resolve("");

		const result = await readReadmeAdditional(getReadme);

		expect(result).toBeUndefined();
	});

	it("returns undefined when there is no contributors indicator", async () => {
		const getReadme = () => Promise.resolve(`# My Package`);

		const result = await readReadmeAdditional(getReadme);

		expect(result).toBeUndefined();
	});

	it("returns all content after contributors when there is no template notice", async () => {
		const getReadme = () =>
			Promise.resolve(`# My Package

Usage.

<!-- spellchecker:enable -->

After.
`);

		const result = await readReadmeAdditional(getReadme);

		expect(result).toBe("After.");
	});

	it("returns all content after contributors when there is a comment template notice", async () => {
		const getReadme = () =>
			Promise.resolve(`# My Package

Usage.

<!-- spellchecker:enable -->

After.

<!-- You can remove this notice if you don't want it 🙂 no worries! -->
`);

		const result = await readReadmeAdditional(getReadme);

		expect(result).toBe("After.");
	});

	it("returns all content after contributors when there is a quote template notice", async () => {
		const getReadme = () =>
			Promise.resolve(`# My Package

Usage.

<!-- spellchecker:enable -->

After.

> 💝 This package was templated with ...
`);

		const result = await readReadmeAdditional(getReadme);

		expect(result).toBe("After.");
	});
});
