import { describe, expect, it, vi } from "vitest";

import { updateReadme } from "./updateReadme.js";

const mockWriteFile = vi.fn();

vi.mock("node:fs/promises", () => ({
	get writeFile() {
		return mockWriteFile;
	},
}));

const mockReadFileSafe = vi.fn();

vi.mock("../shared/readFileSafe.js", () => ({
	get readFileSafe() {
		return mockReadFileSafe;
	},
}));

const options = {
	owner: "NewOwner",
};

describe("updateReadme", () => {
	it("adds a notice when the file does not contain it already", async () => {
		mockReadFileSafe.mockResolvedValue(
			"Existing JoshuaKGoldberg/create-typescript-app content.",
		);

		await updateReadme(options);

		expect(mockWriteFile.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "./README.md",
			    "Existing NewOwner/create-typescript-app content.
			<!-- You can remove this notice if you don't want it 🙂 no worries! -->

			> 💙 This package was templated with [\`create-typescript-app\`](https://github.com/JoshuaKGoldberg/create-typescript-app).
			",
			  ],
			]
		`);
	});

	it("doesn't add a notice when the file contains it already", async () => {
		mockReadFileSafe.mockResolvedValue(`
			Existing JoshuaKGoldberg/create-typescript-app content.
			
			<!-- You can remove this notice if you don't want it 🙂 no worries! -->
			
			> 💙 This package was templated using [create-typescript-app](https://github.com/JoshuaKGoldberg/create-typescript-app).
		`);

		await updateReadme(options);

		expect(mockWriteFile.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "./README.md",
			    "
						Existing NewOwner/create-typescript-app content.
						
						<!-- You can remove this notice if you don't want it 🙂 no worries! -->
						
						> 💙 This package was templated using [create-typescript-app](https://github.com/NewOwner/create-typescript-app).
					",
			  ],
			]
		`);
	});

	it("doesn't add a notice when the file contains an older version of it already", async () => {
		mockReadFileSafe.mockResolvedValue(`
			Existing JoshuaKGoldberg/create-typescript-app content.

			💙 This package is based on [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)'s [create-typescript-app](https://github.com/JoshuaKGoldberg/create-typescript-app).
		`);

		await updateReadme(options);

		expect(mockWriteFile.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "./README.md",
			    "
						Existing NewOwner/create-typescript-app content.

						💙 This package is based on [@NewOwner](https://github.com/NewOwner)'s [create-typescript-app](https://github.com/NewOwner/create-typescript-app).
					",
			  ],
			]
		`);
	});
});
