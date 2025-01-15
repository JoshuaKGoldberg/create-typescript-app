import { describe, expect, it, vi } from "vitest";

import { tryCatchLazyValueAsync } from "./tryCatchLazyValueAsync.js";

describe("tryCatchLazyValueAsync", () => {
	it("does not run get when it has not been called", () => {
		const get = vi.fn();

		tryCatchLazyValueAsync(get);

		expect(get).not.toHaveBeenCalled();
	});

	it("returns get's resolved value when it resolves", async () => {
		const expected = "value";
		const get = vi.fn().mockResolvedValue(expected);

		const lazy = tryCatchLazyValueAsync(get);

		expect(await lazy()).toEqual(expected);
	});

	it("returns undefined when get rejects", async () => {
		const get = vi.fn().mockRejectedValue(new Error("Oh no!"));

		const lazy = tryCatchLazyValueAsync(get);

		expect(await lazy()).toBeUndefined();
	});
});
