import { describe, expect, it } from "vitest";

import { swallowError } from "./swallowError.js";

describe(swallowError, () => {
	it("returns the value when it's not an error", () => {
		const value = 123;

		const actual = swallowError(value);

		expect(actual).toBe(value);
	});

	it("returns undefined when the value is an error", () => {
		const error = new Error("oops");

		const actual = swallowError(error);

		expect(actual).toBe(undefined);
	});
});
