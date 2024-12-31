import { describe, expect, it } from "vitest";

import { getUsageFromReadme } from "./getUsageFromReadme.js";

describe("getUsageFromReadme", () => {
	it("returns undefined when ## Usage is not found", () => {
		const usage = getUsageFromReadme("## Other");

		expect(usage).toBeUndefined();
	});

	it("returns undefined when ## Usage found and ## Development is not found", () => {
		const usage = getUsageFromReadme("## Usage\n\nContents.");

		expect(usage).toBeUndefined();
	});

	it("returns undefined when there is no content between ## Usage and ## Development", () => {
		const usage = getUsageFromReadme("## Usage\n\n  \n## Development");

		expect(usage).toBeUndefined();
	});

	it("returns the content when content exists between ## Usage and ## Development", () => {
		const usage = getUsageFromReadme("## Usage\n\n  Content.\n## Development");

		expect(usage).toBe("Content.");
	});
});
