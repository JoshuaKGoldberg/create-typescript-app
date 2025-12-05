import { describe, expect, it } from "vitest";

import { intakeFileAsYaml } from "./intakeFileAsYaml.js";

describe(intakeFileAsYaml, () => {
	it("returns undefined when the file does not exist", () => {
		const actual = intakeFileAsYaml({}, ["does-not-exist.yaml"]);

		expect(actual).toBeUndefined();
	});

	it("returns undefined when the file does not have valid YAML under .yaml", () => {
		const actual = intakeFileAsYaml(
			{
				"file.yaml": ["{"],
			},
			["file.yaml"],
		);

		expect(actual).toBeUndefined();
	});

	it("returns loaded file contents when the file has valid YAML under .yaml", () => {
		const actual = intakeFileAsYaml(
			{
				"file.yaml": ["key: value"],
			},
			["file.yaml"],
		);

		expect(actual).toEqual({ key: "value" });
	});

	it("returns loaded file contents when the file has valid YAML under .yml", () => {
		const actual = intakeFileAsYaml(
			{
				"file.yml": ["key: value"],
			},
			["file.yaml"],
		);

		expect(actual).toEqual({ key: "value" });
	});
});
