import { describe, expect, it } from "vitest";

import { intakeFileAsJson } from "./intakeFileAsJson.js";

describe(intakeFileAsJson, () => {
	it("returns undefined when the file does not exist", () => {
		const actual = intakeFileAsJson({}, []);

		expect(actual).toBeUndefined();
	});

	it("returns undefined when the file does not have valid JSON", () => {
		const actual = intakeFileAsJson(
			{
				"file.json": ["{"],
			},
			["file.json"],
		);

		expect(actual).toBeUndefined();
	});

	it("returns loaded file contents when the file has valid JSON", () => {
		const value = { key: "value" };

		const actual = intakeFileAsJson(
			{
				"file.json": [JSON.stringify(value)],
			},
			["file.json"],
		);

		expect(actual).toEqual(value);
	});
});
