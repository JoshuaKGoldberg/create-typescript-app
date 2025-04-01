import { describe, expect, test } from "vitest";

import { trimPrecedingSlash } from "./trimPrecedingSlash.js";

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
