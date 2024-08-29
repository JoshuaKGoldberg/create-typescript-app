import { describe, expect, it, vi } from "vitest";

import { getGitHub } from "./getGitHub.js";

const mockGetGitHubAuthToken = vi.fn();

vi.mock("get-github-auth-token", () => ({
	get getGitHubAuthToken() {
		return mockGetGitHubAuthToken;
	},
}));

class MockOctokit {
	readonly auth: string;

	constructor(options: { auth: string }) {
		this.auth = options.auth;
	}
}

vi.mock("octokit", () => ({
	get Octokit() {
		return MockOctokit;
	},
}));

describe("getOctokit", () => {
	it("throws an error when getGitHubAuthToken fails", async () => {
		mockGetGitHubAuthToken.mockResolvedValue({
			error: "Oh no!",
			succeeded: false,
		});

		await expect(getGitHub).rejects.toMatchInlineSnapshot(
			`[Error: Couldn't authenticate with GitHub. Either log in with \`gh auth login\` (https://cli.github.com) or set a GH_TOKEN environment variable.]`,
		);
	});

	it("returns a new Octokit when getGitHubAuthToken succeeds", async () => {
		const auth = "abc123";

		mockGetGitHubAuthToken.mockResolvedValue({
			succeeded: true,
			token: auth,
		});

		const actual = await getGitHub();

		expect(actual).toEqual({ auth, octokit: new MockOctokit({ auth }) });
	});
});
