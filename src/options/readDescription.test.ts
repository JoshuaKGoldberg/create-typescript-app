import { describe, expect, it } from "vitest";

import { packageData } from "../data/packageData.js";
import { readDescription } from "./readDescription.js";

describe(readDescription, () => {
	it("returns undefined when the there is no package.json description", async () => {
		const description = await readDescription(
			() => Promise.resolve({}),
			() => Promise.resolve(""),
			() => Promise.resolve("other-repository"),
		);

		expect(description).toBeUndefined();
	});

	it("returns the README.md description when it matches the current package.json description", async () => {
		const existing = "Same description.";

		const description = await readDescription(
			() => Promise.resolve({ description: existing }),
			() => Promise.resolve(""),
			() => Promise.resolve("other-repository"),
		);

		expect(description).toBe(existing);
	});

	it("returns the updated package.json description when neither description nor name match the current package.json", async () => {
		const updated = "Updated description.";

		const description = await readDescription(
			() => Promise.resolve({ description: updated }),
			() => Promise.resolve(""),
			() => Promise.resolve("other-repository"),
		);

		expect(description).toBe(updated);
	});

	it("returns the existing description when they are equal to crate-typescript-app's and the repository is create-typescript-app", async () => {
		const description = await readDescription(
			() => Promise.resolve({ description: packageData.description }),
			() => Promise.resolve(`<p align="center">${packageData.description}</p>`),
			() => Promise.resolve("create-typescript-app"),
		);

		expect(description).toBe(packageData.description);
	});

	it("returns undefined when the descriptions are create-typescript-app's and the repository is not", async () => {
		const description = await readDescription(
			() => Promise.resolve({ description: packageData.description }),
			() => Promise.resolve(`<p align="center">${packageData.description}</p>`),
			() => Promise.resolve("other-repository"),
		);

		expect(description).toBeUndefined();
	});

	it("uses a README.md HTML description when it matches plain text from package.json plus HTML tags", async () => {
		const plaintext = "Updated description.";
		const encoded = "Updated <code>description</code>.";

		const description = await readDescription(
			() => Promise.resolve({ description: plaintext }),
			() => Promise.resolve(`<p align="center">${encoded}</p>`),
			() => Promise.resolve("other-repository"),
		);

		expect(description).toBe(encoded);
	});

	it("uses a README.md HTML description when it matches markdown from package.json plus HTML tags", async () => {
		const markdown = "Before `inner` after.";
		const html = `Before <a href="https://create.bingo"><code>inner</code></a> after.`;

		const description = await readDescription(
			() => Promise.resolve({ description: markdown }),
			() => Promise.resolve(`<p align="center">${html}</p>`),
			() => Promise.resolve("other-repository"),
		);

		expect(description).toBe(html);
	});

	it("uses a plain text package.json description when the README.md HTML description doesn't match what's inferred from package.json plus HTML tags", async () => {
		const plaintext = "Updated description.";
		const encoded = "Incorrect <code>description</code>.";

		const description = await readDescription(
			() => Promise.resolve({ description: plaintext }),
			() => Promise.resolve(`<p align="center">${encoded}</p>`),
			() => Promise.resolve("other-repository"),
		);

		expect(description).toBe(plaintext);
	});

	it("uses a markdown package.json description parsed to HTML when the README.md does not have a description and the package.json description is markdown", async () => {
		const inPackageJson = "Updated _description_.";
		const inReadme = "Incorrect <code>description</code>.";

		const description = await readDescription(
			() => Promise.resolve({ description: inPackageJson }),
			() => Promise.resolve(`<p align="center">${inReadme}</p>`),
			() => Promise.resolve("other-repository"),
		);

		expect(description).toBe("Updated <em>description</em>.");
	});
});
