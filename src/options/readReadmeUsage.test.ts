import { describe, expect, it, vi } from "vitest";

import { readReadmeUsage } from "./readReadmeUsage.js";

const mockReadUsageFromReadme = vi.fn();

vi.mock("./readUsageFromReadme.js", () => ({
	get readUsageFromReadme() {
		return mockReadUsageFromReadme;
	},
}));

describe(readReadmeUsage, () => {
	it("returns the existing usage when readUsageFromReadme provides one", async () => {
		const existing = "Use it.";

		mockReadUsageFromReadme.mockReturnValueOnce(existing);

		const usage = await readReadmeUsage(
			() => Promise.resolve("💖"),
			() => Promise.resolve(""),
			() => Promise.resolve(undefined),
		);

		expect(usage).toBe(existing);
	});

	it("returns sample usage when readUsageFromReadme doesn't provide usage", async () => {
		mockReadUsageFromReadme.mockReturnValueOnce(undefined);

		const usage = await readReadmeUsage(
			() => Promise.resolve("💖"),
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
