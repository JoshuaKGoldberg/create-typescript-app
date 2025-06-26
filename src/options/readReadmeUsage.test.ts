import { describe, expect, it } from "vitest";

import { readReadmeUsage } from "./readReadmeUsage.js";

describe(readReadmeUsage, () => {
	it("returns undefined when ## Usage is not found", async () => {
		const actual = await readReadmeUsage(() => Promise.resolve("## Other"));

		expect(actual).toBeUndefined();
	});

	it("returns existing content when ## Usage is found and a next important heading is not found", async () => {
		const actual = await readReadmeUsage(() =>
			Promise.resolve("## Usage\n\nContents."),
		);

		expect(actual).toBe(`\n\nContents.`);
	});

	it("returns undefined when there is no content between ## Usage and ## Development", async () => {
		const actual = await readReadmeUsage(() =>
			Promise.resolve("## Usage\n\n  \n## Development"),
		);

		expect(actual).toBeUndefined();
	});

	it("returns the content when content exists between ## Usage and ## Development", async () => {
		const actual = await readReadmeUsage(() =>
			Promise.resolve("## Usage\n\n  Content.\n## Development"),
		);

		expect(actual).toBe("Content.");
	});

	it("returns the content when content exists between ## Usage and ## Contributing", async () => {
		const actual = await readReadmeUsage(() =>
			Promise.resolve("## Usage\n\n  Content.\n## Contributing"),
		);

		expect(actual).toBe("Content.");
	});

	it("returns the content when content exists between ## Usage and ## Contributors", async () => {
		const actual = await readReadmeUsage(() =>
			Promise.resolve("## Usage\n\n  Content.\n## Contributors"),
		);

		expect(actual).toBe("Content.");
	});
});
