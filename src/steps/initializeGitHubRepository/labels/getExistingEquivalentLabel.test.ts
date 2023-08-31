import { describe, expect, it } from "vitest";

import { getExistingEquivalentLabel } from "./getExistingEquivalentLabel.js";

const createLabel = (name: string) => ({
	color: "#000000",
	description: "A good label.",
	name,
});

describe("getExistingEquivalentLabel", () => {
	it("returns undefined when there are no existing labels", () => {
		const actual = getExistingEquivalentLabel([], "abc");

		expect(actual).toBe(undefined);
	});

	it("returns undefined when no existing label matches", () => {
		const actual = getExistingEquivalentLabel([createLabel("abc")], "def");

		expect(actual).toBe(undefined);
	});

	it("returns an existing un-prefixed label when it matches by name", () => {
		const abcLabel = createLabel("abc");
		const actual = getExistingEquivalentLabel(
			[createLabel("def"), abcLabel, createLabel("ghi")],
			"abc",
		);

		expect(actual).toBe(abcLabel);
	});

	it("returns an existing prefixed label when it matches by name", () => {
		const abcDefLabel = createLabel("abc: def");
		const actual = getExistingEquivalentLabel([abcDefLabel], "abc: def");

		expect(actual).toBe(abcDefLabel);
	});

	it("returns the existing label when it matches excluding prefix", () => {
		const abcLabel = createLabel("abc");
		const actual = getExistingEquivalentLabel(
			[createLabel("abc: def"), abcLabel, createLabel("ghi")],
			"type: abc",
		);

		expect(actual).toBe(abcLabel);
	});

	it("returns the existing label when it matches an alias", () => {
		const enhancementLabel = createLabel("enhancement");
		const actual = getExistingEquivalentLabel(
			[createLabel("abc: def"), enhancementLabel, createLabel("ghi")],
			"type: feature",
		);

		expect(actual).toBe(enhancementLabel);
	});
});
