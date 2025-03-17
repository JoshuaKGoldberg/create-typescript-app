import { describe, expect, it, vi } from "vitest";

import { readUsage } from "./readUsage.js";

const mockReadUsageFromReadme = vi.fn();

vi.mock("./readUsageFromReadme.js", () => ({
	get readUsageFromReadme() {
		return mockReadUsageFromReadme;
	},
}));

describe(readUsage, () => {
	it("returns the existing usage when readUsageFromReadme provides one", async () => {
		const existing = "Use it.";

		mockReadUsageFromReadme.mockReturnValueOnce(existing);

		const usage = await readUsage(
			() => Promise.resolve("💖"),
			() => Promise.resolve(""),
			() => Promise.resolve(undefined),
		);

		expect(usage).toBe(existing);
	});

	it("returns sample usage when readUsageFromReadme doesn't provide usage", async () => {
		mockReadUsageFromReadme.mockReturnValueOnce(undefined);

		const usage = await readUsage(
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
