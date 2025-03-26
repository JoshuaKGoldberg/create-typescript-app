import { describe, expect, it, vi } from "vitest";

import { readWords } from "./readWords.js";

describe(readWords, () => {
	it("returns undefined when the file does not exist", async () => {
		const take = vi.fn().mockRejectedValueOnce(new Error("Oh no!"));

		const actual = await readWords(take);

		expect(actual).toBeUndefined();
	});

	it("returns undefined when the file has no words", async () => {
		const take = vi.fn().mockResolvedValueOnce({});

		const actual = await readWords(take);

		expect(actual).toBeUndefined();
	});

	it("returns the words when the file has words", async () => {
		const words = ["abc", "def"];
		const take = vi.fn().mockResolvedValueOnce({ words });

		const actual = await readWords(take);

		expect(actual).toEqual(words);
	});
});
