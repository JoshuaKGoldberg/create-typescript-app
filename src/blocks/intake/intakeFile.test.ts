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

	it("returns undefined when filePath points to a root-level directory", () => {
		const actual = intakeFile(
			{
				"file.txt": {},
			},
			["file.txt"],
		);

		expect(actual).toBeUndefined();
	});

	it("returns undefined when filePath points to a root-level undefined", () => {
		const actual = intakeFile(
			{
				"file.txt": undefined,
			},
			["file.txt"],
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

	it("returns undefined when filePath is within a file", () => {
		const actual = intakeFile(
			{
				src: ["abc123"],
			},
			["src", "file.txt"],
		);

		expect(actual).toBeUndefined();
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

	it("returns undefined when filePath points to a directory in a directory", () => {
		const actual = intakeFile(
			{
				src: {
					"file.txt": {},
				},
			},
			["src", "file.txt"],
		);

		expect(actual).toBeUndefined();
	});

	it("returns the file when filePath does not point to a file in the root", () => {
		const value = "abc123";

		const actual = intakeFile(
			{
				"file.txt": [value],
			},
			["other.txt"],
		);

		expect(actual).toBeUndefined();
	});

	it("returns the file when filePath does not point to a file in a directory", () => {
		const value = "abc123";

		const actual = intakeFile(
			{
				src: {
					"file.txt": [value],
				},
			},
			["src", "other.txt"],
		);

		expect(actual).toBeUndefined();
	});

	it("returns the file when filePath is an array whose first element points to a file in a directory", () => {
		const value = "abc123";

		const actual = intakeFile(
			{
				src: {
					"file.txt": [value],
				},
			},
			["src", ["file.txt", "other.txt"]],
		);

		expect(actual).toEqual([value]);
	});

	it("returns the file when filePath is an array whose second element points to a file in a directory", () => {
		const value = "abc123";

		const actual = intakeFile(
			{
				src: {
					"file.txt": [value],
				},
			},
			["src", ["other.txt", "file.txt"]],
		);

		expect(actual).toEqual([value]);
	});

	it("returns nothing when filePath is an array and no element points to a file in a directory", () => {
		const value = "abc123";

		const actual = intakeFile(
			{
				src: {
					"file.txt": [value],
				},
			},
			["src", ["other-a.txt", "other-b.txt"]],
		);

		expect(actual).toBeUndefined();
	});
});
