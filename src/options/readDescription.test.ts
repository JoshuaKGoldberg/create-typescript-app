import { describe, expect, it, vi } from "vitest";

import { readDescription } from "./readDescription.js";

const mockPackageDataDescription = vi.fn<() => string>();

vi.mock("../data/packageData.js", () => ({
	packageData: {
		get description() {
			return mockPackageDataDescription();
		},
	},
}));

describe("readDescription", () => {
	it("returns undefined when the description matches the current package.json description", async () => {
		const existing = "Same description.";

		mockPackageDataDescription.mockReturnValueOnce(existing);

		const description = await readDescription(
			() => Promise.resolve({ description: existing }),
			() => Promise.resolve(""),
		);

		expect(description).toBeUndefined();
	});

	it("returns the updated description when neither description nor name match the current package.json", async () => {
		const updated = "Updated description.";

		mockPackageDataDescription.mockReturnValueOnce("Existing description");

		const description = await readDescription(
			() => Promise.resolve({ description: updated }),
			() => Promise.resolve(""),
		);

		expect(description).toBe(updated);
	});

	it("uses the README.md HTML description when it matches what's inferred from package.json plus HTML tags", async () => {
		const plaintext = "Updated description.";
		const encoded = "Updated <code>description</code>.";

		mockPackageDataDescription.mockReturnValueOnce("Existing description");

		const description = await readDescription(
			() => Promise.resolve({ description: plaintext }),
			() => Promise.resolve(`<p align="center">${encoded}</p>`),
		);

		expect(description).toBe(encoded);
	});

	it("uses the package.json description when the README.md HTML description doesn't match what's inferred from package.json plus HTML tags", async () => {
		const plaintext = "Updated description.";
		const encoded = "Incorrect <code>description</code>.";

		mockPackageDataDescription.mockReturnValueOnce("Existing description");

		const description = await readDescription(
			() => Promise.resolve({ description: plaintext }),
			() => Promise.resolve(`<p align="center">${encoded}</p>`),
		);

		expect(description).toBe(plaintext);
	});
});
