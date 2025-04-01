import { describe, expect, it } from "vitest";

import { intakeFile } from "./intakeFile.js";

describe(intakeFile, () => {
	it("returns undefined when filePath is empty", () => {
		const actual = intakeFile(
			{
				src: {},
			},
			[],
		);

		expect(actual).toBeUndefined();
	});

	it("returns undefined when filePath is not found", () => {
		const actual = intakeFile(
			{
				src: {},
			},
			["lib"],
		);

		expect(actual).toBeUndefined();
	});

	it("returns the file when filePath points to a root-level file", () => {
		const value = "abc123";

		const actual = intakeFile(
			{
				"file.txt": [value],
			},
			["file.txt"],
		);

		expect(actual).toEqual([value]);
	});

	it("returns the file when filePath points to a file in a directory", () => {
		const value = "abc123";

		const actual = intakeFile(
			{
				src: {
					"file.txt": [value],
				},
			},
			["src", "file.txt"],
		);

		expect(actual).toEqual([value]);
	});
});
