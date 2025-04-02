import { describe, expect, it } from "vitest";

import { readKeywords } from "./readKeywords.js";

describe(readKeywords, () => {
	it("resolves with undefined when there are no existing keywords", async () => {
		const actual = await readKeywords(() => Promise.resolve({}));

		expect(actual).toBeUndefined();
	});

	it("resolves with deduplicated and sorted keywords when there are existing keywords", async () => {
		const actual = await readKeywords(() =>
			Promise.resolve({
				keywords: ["b", "a", "c d", "b", "a"],
			}),
		);

		expect(actual).toEqual(["a", "b", "c d"]);
	});
});
