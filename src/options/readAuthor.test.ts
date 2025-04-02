import { describe, expect, it, vi } from "vitest";

import { readAuthor } from "./readAuthor.js";

describe(readAuthor, () => {
	it("returns package author when it exists", async () => {
		const name = "test-author";
		const getNpmDefaults = vi.fn();

		const actual = await readAuthor(
			() => Promise.resolve({ name }),
			getNpmDefaults,
			undefined,
		);

		expect(actual).toBe(name);
		expect(getNpmDefaults).not.toHaveBeenCalled();
	});

	it("returns npm defaults name when only it exists", async () => {
		const name = "test-name";

		const actual = await readAuthor(
			() => Promise.resolve({}),
			() => Promise.resolve({ name }),
			undefined,
		);

		expect(actual).toBe(name);
	});

	it("returns owner when only it exists", async () => {
		const owner = "test-owner";

		const actual = await readAuthor(
			() => Promise.resolve({}),
			() => Promise.resolve(undefined),
			owner,
		);

		expect(actual).toBe(owner);
	});

	it("returns undefined when no sources provide a value", async () => {
		const actual = await readAuthor(
			() => Promise.resolve({}),
			() => Promise.resolve(undefined),
			undefined,
		);

		expect(actual).toBeUndefined();
	});
});
