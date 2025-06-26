import { describe, expect, it } from "vitest";

import { intakeFileAsYaml } from "./intakeFileAsYaml.js";

describe(intakeFileAsYaml, () => {
	it("returns undefined when the file does not exist", () => {
		const actual = intakeFileAsYaml({}, []);

		expect(actual).toBeUndefined();
	});

	it("returns undefined when the file does not have valid yml", () => {
		const actual = intakeFileAsYaml(
			{
				"file.yml": ["{"],
			},
			["file.yml"],
		);

		expect(actual).toBeUndefined();
	});

	it("returns loaded file contents when the file has valid yml", () => {
		const actual = intakeFileAsYaml(
			{
				"file.yml": ["key: value"],
			},
			["file.yml"],
		);

		expect(actual).toEqual({ key: "value" });
	});
});
