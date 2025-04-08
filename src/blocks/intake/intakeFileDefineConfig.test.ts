import { describe, expect, it } from "vitest";

import { intakeFileDefineConfig } from "./intakeFileDefineConfig.js";

describe("intake", () => {
	it("returns nothing when the filePath file does not exist", () => {
		const actual = intakeFileDefineConfig({}, ["file.config.ts"]);

		expect(actual).toBeUndefined();
	});

	it("returns nothing when the filePath file does not contain the expected defineConfig", () => {
		const actual = intakeFileDefineConfig(
			{
				"file.config.ts": [`invalid`],
			},
			["file.config.ts"],
		);

		expect(actual).toBeUndefined();
	});

	it("returns nothing when the filePath file passes nothing to defineConfig", () => {
		const actual = intakeFileDefineConfig(
			{
				"file.config.ts": [`defineConfig()`],
			},
			["file.config.ts"],
		);

		expect(actual).toBeUndefined();
	});

	it("returns nothing when the filePath file passes invalid data to defineConfig", () => {
		const actual = intakeFileDefineConfig(
			{
				"file.config.ts": [`defineConfig(invalid)`],
			},
			["file.config.ts"],
		);

		expect(actual).toBeUndefined();
	});

	it("returns nothing when the filePath file passes a non-object to defineConfig", () => {
		const actual = intakeFileDefineConfig(
			{
				"file.config.ts": [`defineConfig("invalid")`],
			},
			["file.config.ts"],
		);

		expect(actual).toBeUndefined();
	});

	it("returns values when they exist in the filePath file", () => {
		const actual = intakeFileDefineConfig(
			{
				"file.config.ts": [
					`import { defineConfig } from "...";

export default defineConfig({
	abc: 123,
	def: 456,
});
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
