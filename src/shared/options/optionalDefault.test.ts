import { describe, expect, it } from "vitest";

import { optionalDefault } from "./optionalDefault.js";

describe("optionalDefault", () => {
	it("returns the provided value when it exists", async () => {
		const value = "abc";

		const actual = await optionalDefault(value, () => Promise.resolve("def"));

		expect(actual).toBe(value);
	});

	it("defaults to the default value when provided as an async function", async () => {
		const value = "abc";

		const actual = await optionalDefault(undefined, () =>
			Promise.resolve(value),
		);

		expect(actual).toBe(value);
	});

	it("defaults to the default value when provided directly", async () => {
		const value = "abc";

		const actual = await optionalDefault(undefined, value);

		expect(actual).toBe(value);
	});
});
