import { describe, expect, it } from "vitest";

import { withPreviously } from "./withPreviously.ts";

describe(withPreviously, () => {
	it.each([false, undefined, ""] as const)(
		"returns %j when contents are %j",
		(contents) => {
			expect(withPreviously(contents, ["a.yml"])).toBe(contents);
		},
	);

	it("returns contents with previously metadata when contents are a string", () => {
		expect(withPreviously("abc", ["a.yml"])).toEqual([
			"abc",
			{ previously: ["a.yml"] },
		]);
	});
});
