import { describe, expect, it } from "vitest";

import { intakeFileExportObject } from "./intakeFileExportObject.js";

describe("intake", () => {
	it("returns nothing when the filePath file does not exist", () => {
		const actual = intakeFileExportObject({}, ["file.config.ts"]);

		expect(actual).toBeUndefined();
	});

	it("returns nothing when the filePath file does not contain the expected defineConfig", () => {
		const actual = intakeFileExportObject(
			{
				"file.config.ts": [`invalid`],
			},
			["file.config.ts"],
		);

		expect(actual).toBeUndefined();
	});

	it("returns nothing when the filePath file does not have an export default", () => {
		const actual = intakeFileExportObject(
			{
				"file.config.ts": [`export const value = {};`],
			},
			["file.config.ts"],
		);

		expect(actual).toBeUndefined();
	});

	it("returns nothing when the filePath file passes invalid data to defineConfig", () => {
		const actual = intakeFileExportObject(
			{
				"file.config.ts": [`export default invalid;`],
			},
			["file.config.ts"],
		);

		expect(actual).toBeUndefined();
	});

	it("returns nothing when the filePath file passes a non-object to defineConfig", () => {
		const actual = intakeFileExportObject(
			{
				"file.config.ts": [`export default "invalid";`],
			},
			["file.config.ts"],
		);

		expect(actual).toBeUndefined();
	});

	it("returns values when they exist in the filePath file", () => {
		const actual = intakeFileExportObject(
			{
				"file.config.ts": [
					`import type { ConfigShape } from "...";

export default {
	abc: 123,
	def: 456,
} satisfies ConfigShape;
`,
				],
			},
			["file.config.ts"],
		);

		expect(actual).toEqual({
			abc: 123,
			def: 456,
		});
	});
});
