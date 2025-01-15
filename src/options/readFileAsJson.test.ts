import { describe, expect, it, vi } from "vitest";

import { readFileAsJson } from "./readFileAsJson.js";

const mockReadFile = vi.fn();

vi.mock("node:fs/promises", () => ({
	get readFile() {
		return mockReadFile;
	},
}));

describe("readFileAsJson", () => {
	it("returns the file's parsed contents when it exists", async () => {
		const data = { abc: 123 };

		mockReadFile.mockResolvedValue(JSON.stringify(data));

		const actual = await readFileAsJson("filePath.json");

		expect(actual).toEqual(data);
	});

	it("throws an error when the file doesn't exist", async () => {
		const error = new Error("Oh no!");

		mockReadFile.mockRejectedValue(error);

		await expect(() => readFileAsJson("filePath.json")).rejects.toEqual(
			new Error(
				`Could not read file from filePath.json as JSON. Please ensure the file exists and is valid JSON.`,
				{ cause: error },
			),
		);
	});
});
