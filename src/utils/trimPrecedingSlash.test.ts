import { describe, expect, test } from "vitest";

import { trimPrecedingSlash } from "./trimPrecedingSlash.ts";

describe(trimPrecedingSlash, () => {
	test.each([
		[undefined, undefined],
		["", ""],
		["a", "a"],
		["./a", "a"],
	])("%s becomes %s", (input, expected) => {
		const actual = trimPrecedingSlash(input);
		expect(actual).toBe(expected);
	});
});
