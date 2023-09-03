import { describe, expect, it } from "vitest";

import { getExistingEquivalentLabels } from "./getExistingEquivalentLabels.js";

const createLabel = (name: string) => ({
	color: "#000000",
	description: "A good label.",
	name,
});

describe("getExistingEquivalentLabels", () => {
	it("returns no labels when there are no existing labels", () => {
		const actual = getExistingEquivalentLabels([], "abc");

		expect(actual).toEqual([]);
	});

	it("returns no labels when no existing label matches", () => {
		const actual = getExistingEquivalentLabels([createLabel("abc")], "def");

		expect(actual).toEqual([]);
	});

	it("returns an existing un-prefixed label when it matches by name", () => {
		const abcLabel = createLabel("abc");
		const actual = getExistingEquivalentLabels(
			[createLabel("def"), abcLabel, createLabel("ghi")],
			"abc",
		);

		expect(actual).toEqual([abcLabel]);
	});

	it("returns an existing prefixed label when it matches by name", () => {
		const abcDefLabel = createLabel("abc: def");
		const actual = getExistingEquivalentLabels([abcDefLabel], "abc: def");

		expect(actual).toEqual([abcDefLabel]);
	});

	it("returns the existing label when it matches excluding prefix", () => {
		const abcLabel = createLabel("abc");
		const actual = getExistingEquivalentLabels(
			[createLabel("abc: def"), abcLabel, createLabel("ghi")],
			"type: abc",
		);

		expect(actual).toEqual([abcLabel]);
	});

	it("returns the existing label when it matches an alias", () => {
		const enhancementLabel = createLabel("enhancement");
		const actual = getExistingEquivalentLabels(
			[createLabel("abc: def"), enhancementLabel, createLabel("ghi")],
			"type: feature",
		);

		expect(actual).toEqual([enhancementLabel]);
	});

	it("returns both existing labels when one matches on name and another matches an alias", () => {
		const enhancementLabel = createLabel("enhancement");
		const typeFeatureLabel = createLabel("type: feature");
		const actual = getExistingEquivalentLabels(
			[
				createLabel("abc: def"),
				enhancementLabel,
				createLabel("ghi"),
				typeFeatureLabel,
			],
			"type: feature",
		);

		expect(actual).toEqual([enhancementLabel, typeFeatureLabel]);
	});
});
