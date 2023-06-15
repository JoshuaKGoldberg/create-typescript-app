import { describe, expect, it, vi } from "vitest";

import { getDefaultSettings } from "./getDefaultSettings.js";

vi.mock("./cli/lines.js");

const mockGitRemoteOriginUrl = vi.fn();

vi.mock("git-remote-origin-url", () => ({
	get default() {
		return mockGitRemoteOriginUrl;
	},
}));

describe("getDefaultSettings", () => {
	it("returns the retrieved owner and repository when gitRemoteOriginUrl succeeds", async () => {
		mockGitRemoteOriginUrl.mockResolvedValue("https://github.com/abc/def");

		const settings = await getDefaultSettings();

		expect(settings).toEqual({ defaultOwner: "abc", defaultRepository: "def" });
	});

	it("returns arbitrary owner and repository defaults when gitRemoteOriginUrl rejects", async () => {
		mockGitRemoteOriginUrl.mockRejectedValue(new Error("Oh no!"));

		const settings = await getDefaultSettings();

		expect(settings).toEqual({
			defaultOwner: "UserName",
			defaultRepository: "my-lovely-repository",
		});
	});
});
