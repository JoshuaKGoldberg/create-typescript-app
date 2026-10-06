import { describe, expect, it } from "vitest";

import { readReadmeUsage } from "./readReadmeUsage.ts";

describe(readReadmeUsage, () => {
	it("returns undefined when there is no existing readme content", async () => {
		const actual = await readReadmeUsage(() => Promise.resolve(""));

		expect(actual).toBeUndefined();
	});

	it("returns an empty string when ## Usage is not found in existing readme content", async () => {
		const actual = await readReadmeUsage(() => Promise.resolve("## Other"));

		expect(actual).toBe("");
	});

	it("returns existing content when ## Usage is found and a next important heading is not found", async () => {
		const actual = await readReadmeUsage(() =>
			Promise.resolve("## Usage\n\nContents."),
		);

		expect(actual).toBe(`## Usage\n\nContents.`);
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

		expect(actual).toBe("## Usage\n\n  Content.");
	});

	it("returns the content when content exists between ## Usage and ## Contributing", async () => {
		const actual = await readReadmeUsage(() =>
			Promise.resolve("## Usage\n\n  Content.\n## Contributing"),
		);

		expect(actual).toBe("## Usage\n\n  Content.");
	});

	it("returns the content when content exists between ## Usage and ## Contributors", async () => {
		const actual = await readReadmeUsage(() =>
			Promise.resolve("## Usage\n\n  Content.\n## Contributors"),
		);

		expect(actual).toBe("## Usage\n\n  Content.");
	});
});
