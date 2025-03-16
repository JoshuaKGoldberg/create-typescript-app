import { describe, expect, it, vi } from "vitest";

import { readUsage } from "./readUsage.js";

const mockGetUsageFromReadme = vi.fn();

vi.mock("./getUsageFromReadme.js", () => ({
	get getUsageFromReadme() {
		return mockGetUsageFromReadme;
	},
}));

describe(readUsage, () => {
	it("returns the existing usage when getUsageFromReadme provides one", async () => {
		const existing = "Use it.";

		mockGetUsageFromReadme.mockReturnValueOnce(existing);

		const usage = await readUsage(
			() => Promise.resolve(""),
			() => Promise.resolve(undefined),
		);

		expect(usage).toBe(existing);
	});

	it("returns sample usage when getUsageFromReadme doesn't provide usage", async () => {
		mockGetUsageFromReadme.mockReturnValueOnce(undefined);

		const usage = await readUsage(
			() => Promise.resolve(""),
			() => Promise.resolve("test-repository"),
		);

		expect(usage).toBe(`\`\`\`shell
npm i test-repository
\`\`\`
\`\`\`ts
import { greet } from "test-repository";

greet("Hello, world! 💖");
\`\`\``);
	});
});
