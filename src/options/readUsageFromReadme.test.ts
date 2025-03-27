import { describe, expect, it } from "vitest";

import { readUsageFromReadme } from "./readUsageFromReadme.js";

describe(readUsageFromReadme, () => {
	it("returns undefined when ## Usage is not found", () => {
		const usage = readUsageFromReadme("## Other");

		expect(usage).toBeUndefined();
	});

	it("returns existing content when ## Usage is found and a next important heading is not found", () => {
		const usage = readUsageFromReadme("## Usage\n\nContents.");

		expect(usage).toBe(`\n\nContents.`);
	});

	it("returns undefined when there is no content between ## Usage and ## Development", () => {
		const usage = readUsageFromReadme("## Usage\n\n  \n## Development");

		expect(usage).toBeUndefined();
	});

	it("returns the content when content exists between ## Usage and ## Development", () => {
		const usage = readUsageFromReadme("## Usage\n\n  Content.\n## Development");

		expect(usage).toBe("Content.");
	});

	it("returns the content when content exists between ## Usage and ## Contributing", () => {
		const usage = readUsageFromReadme(
			"## Usage\n\n  Content.\n## Contributing",
		);

		expect(usage).toBe("Content.");
	});

	it("returns the content when content exists between ## Usage and ## Contributors", () => {
		const usage = readUsageFromReadme(
			"## Usage\n\n  Content.\n## Contributors",
		);

		expect(usage).toBe("Content.");
	});
});
