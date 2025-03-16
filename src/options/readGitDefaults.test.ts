import { describe, expect, it, vi } from "vitest";

import { readGitDefaults } from "./readGitDefaults.js";

const mockGitRemoteOriginUrl = vi.fn();

vi.mock("git-remote-origin-url", () => ({
	get default() {
		return mockGitRemoteOriginUrl;
	},
}));

describe(readGitDefaults, () => {
	it("resolves undefined when fetching the origin url rejects", async () => {
		mockGitRemoteOriginUrl.mockRejectedValueOnce(new Error("Oh no!"));

		const actual = await readGitDefaults();

		expect(actual).toBeUndefined();
	});

	it("resolves the parsed when fetching the origin url succeeds", async () => {
		mockGitRemoteOriginUrl.mockResolvedValueOnce(
			"git@github.com/JoshuaKGoldberg/create-typescript-app",
		);

		const actual = await readGitDefaults();

		expect(actual).toMatchObject({
			name: "create-typescript-app",
			owner: "JoshuaKGoldberg",
		});
	});
});
