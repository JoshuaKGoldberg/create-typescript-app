import { describe, expect, it } from "vitest";

import { swallowErrorAsync } from "./swallowErrorAsync.js";

describe(swallowErrorAsync, () => {
	it("returns the task's resolved value when it resolves", async () => {
		const expected = "value";
		const task = Promise.resolve(expected);

		const actual = await swallowErrorAsync(task);

		expect(actual).toEqual(expected);
	});

	it("returns undefined when the task rejects", async () => {
		const task = Promise.reject<unknown>(new Error("Oh no!"));

		const actual = await swallowErrorAsync(task);

		expect(actual).toBeUndefined();
	});
});
