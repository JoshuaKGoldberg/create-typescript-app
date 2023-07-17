import { describe, expect, it } from "vitest";

import { getExistingEquivalentLabel } from "./getExistingEquivalentLabel.js";

describe("getExistingEquivalentLabel", () => {
	it("returns undefined when there are no existing labels", () => {
		const actual = getExistingEquivalentLabel([], "abc");

		expect(actual).toBe(undefined);
	});

	it("returns undefined when no existing label matches", () => {
		const actual = getExistingEquivalentLabel(["abc"], "def");

		expect(actual).toBe(undefined);
	});

	it("returns an existing un-prefixed label when it matches by name", () => {
		const actual = getExistingEquivalentLabel(["def", "abc", "ghi"], "abc");

		expect(actual).toBe("abc");
	});

	it("returns an existing prefixed label when it matches by name", () => {
		const actual = getExistingEquivalentLabel(["abc: def"], "abc: def");

		expect(actual).toBe("abc: def");
	});

	it("returns the existing label when it matches excluding prefix", () => {
		const actual = getExistingEquivalentLabel(
			["abc: def", "abc", "ghi"],
			"type: abc",
		);

		expect(actual).toBe("abc");
	});

	it("returns the existing label when it matches an alias", () => {
		const actual = getExistingEquivalentLabel(
			["abc: def", "enhancement", "ghi"],
			"type: feature",
		);

		expect(actual).toBe("enhancement");
	});
});
