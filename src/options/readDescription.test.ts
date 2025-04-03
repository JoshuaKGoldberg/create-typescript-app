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

describe(readDescription, () => {
	it("returns undefined when the there is no package.json description", async () => {
		const description = await readDescription(
			() => Promise.resolve({}),
			() => Promise.resolve(""),
		);

		expect(description).toBeUndefined();
		expect(mockPackageDataDescription).not.toHaveBeenCalled();
	});

	it("returns the README.md description when it matches the current package.json description", async () => {
		const existing = "Same description.";

		mockPackageDataDescription.mockReturnValueOnce(existing);

		const description = await readDescription(
			() => Promise.resolve({ description: existing }),
			() => Promise.resolve(""),
		);

		expect(description).toBe(existing);
	});

	it("returns the updated package.json description when neither description nor name match the current package.json", async () => {
		const updated = "Updated description.";

		mockPackageDataDescription.mockReturnValueOnce("Existing description");

		const description = await readDescription(
			() => Promise.resolve({ description: updated }),
			() => Promise.resolve(""),
		);

		expect(description).toBe(updated);
	});

	it("uses a README.md HTML description when it matches plain text from package.json plus HTML tags", async () => {
		const plaintext = "Updated description.";
		const encoded = "Updated <code>description</code>.";

		mockPackageDataDescription.mockReturnValueOnce("Existing description");

		const description = await readDescription(
			() => Promise.resolve({ description: plaintext }),
			() => Promise.resolve(`<p align="center">${encoded}</p>`),
		);

		expect(description).toBe(encoded);
	});

	it("uses a README.md HTML description when it matches markdown from package.json plus HTML tags", async () => {
		const markdown = "Before `inner` after.";
		const html = `Before <a href="https://create.bingo"><code>inner</code></a> after.`;

		mockPackageDataDescription.mockReturnValueOnce("Existing description");

		const description = await readDescription(
			() => Promise.resolve({ description: markdown }),
			() => Promise.resolve(`<p align="center">${html}</p>`),
		);

		expect(description).toBe(html);
	});

	it("uses a plain text package.json description when the README.md HTML description doesn't match what's inferred from package.json plus HTML tags", async () => {
		const plaintext = "Updated description.";
		const encoded = "Incorrect <code>description</code>.";

		mockPackageDataDescription.mockReturnValueOnce("Existing description");

		const description = await readDescription(
			() => Promise.resolve({ description: plaintext }),
			() => Promise.resolve(`<p align="center">${encoded}</p>`),
		);

		expect(description).toBe(plaintext);
	});

	it("uses a markdown package.json description parsed to HTML when the README.md does not have a description and the package.json description is markdown", async () => {
		const inPackageJson = "Updated _description_.";
		const inReadme = "Incorrect <code>description</code>.";

		mockPackageDataDescription.mockReturnValueOnce("Existing description");

		const description = await readDescription(
			() => Promise.resolve({ description: inPackageJson }),
			() => Promise.resolve(`<p align="center">${inReadme}</p>`),
		);

		expect(description).toBe("Updated <em>description</em>.");
	});
});
