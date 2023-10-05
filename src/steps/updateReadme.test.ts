import { describe, expect, it, vi } from "vitest";

import { updateReadme } from "./updateReadme.js";

const mockAppendFile = vi.fn();

vi.mock("node:fs/promises", () => ({
	default: {
		get appendFile() {
			return mockAppendFile;
		},
	},
}));

const mockReadFileSafe = vi.fn();

vi.mock("../shared/readFileSafe.js", () => ({
	get readFileSafe() {
		return mockReadFileSafe;
	},
}));

describe("updateReadme", () => {
	it("adds a notice when the file does not contain it already", async () => {
		mockReadFileSafe.mockResolvedValue("");

		await updateReadme();

		expect(mockAppendFile.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "./README.md",
			    "
			<!-- You can remove this notice if you don't want it 🙂 no worries! -->

			> 💙 This package was templated with [create-typescript-app](https://github.com/JoshuaKGoldberg/create-typescript-app).
			",
			  ],
			]
		`);
	});

	it("doesn't add a notice when the file contains it already", async () => {
		mockReadFileSafe.mockResolvedValue(`
			<!-- You can remove this notice if you don't want it 🙂 no worries! -->
			
			> 💙 This package was templated using [create-typescript-app](https://github.com/JoshuaKGoldberg/create-typescript-app).
		`);

		await updateReadme();

		expect(mockAppendFile.mock.calls).toMatchInlineSnapshot("[]");
	});

	it("doesn't add a notice when the file contains an older version of it already", async () => {
		mockReadFileSafe.mockResolvedValue(`
			💙 This package is based on [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)'s [create-typescript-app](https://github.com/JoshuaKGoldberg/create-typescript-app).
		`);

		await updateReadme();

		expect(mockAppendFile.mock.calls).toMatchInlineSnapshot("[]");
	});
});
