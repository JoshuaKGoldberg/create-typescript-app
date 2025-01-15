import { describe, expect, it } from "vitest";

import { readDescriptionFromReadme } from "./readDescriptionFromReadme.js";

describe("readDescriptionFromReadme", () => {
	it("returns undefined when the paragraph starter is not found", async () => {
		const description = await readDescriptionFromReadme(() =>
			Promise.resolve(""),
		);

		expect(description).toBeUndefined();
	});

	it("returns undefined when the paragraph closer is not found", async () => {
		const description = await readDescriptionFromReadme(() =>
			Promise.resolve(`<p align="center">`),
		);

		expect(description).toBeUndefined();
	});

	it("returns the description when it exists on one line inside the paragraph", async () => {
		const description = await readDescriptionFromReadme(() =>
			Promise.resolve(`<p align="center">Description.</p>`),
		);

		expect(description).toBe("Description.");
	});
	it("returns the description when it exists encoded across multiple lines inside the paragraph", async () => {
		const description = await readDescriptionFromReadme(() =>
			Promise.resolve(`
				<p align="center">
					Description <em>hooray</em>.
				</p>`),
		);

		expect(description).toBe("Description <em>hooray</em>.");
	});
});
