import { describe, expect, it, vi } from "vitest";

import { getGitDefaultSettings } from "./getGitDefaultSettings.js";

const mockGitRemoteOriginUrl = vi.fn();

vi.mock("git-remote-origin-url", () => ({
	get default() {
		return mockGitRemoteOriginUrl;
	},
}));

vi.mock("../shared/cli/lines.js");

describe("getDefaultSettings", () => {
	it("returns the retrieved owner and repository when gitRemoteOriginUrl succeeds", async () => {
		mockGitRemoteOriginUrl.mockResolvedValueOnce("https://github.com/abc/def");

		const settings = await getGitDefaultSettings();

		expect(settings).toEqual({ owner: "abc", repository: "def" });
	});

	it("returns arbitrary owner and repository defaults when gitRemoteOriginUrl rejects", async () => {
		mockGitRemoteOriginUrl.mockRejectedValueOnce(new Error("Oh no!"));

		const settings = await getGitDefaultSettings();

		expect(settings).toEqual({
			owner: "UserName",
			repository: "my-lovely-repository",
		});
	});
});
