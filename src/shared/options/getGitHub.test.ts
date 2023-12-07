import { describe, expect, it, vi } from "vitest";

import { getGitHub } from "./getGitHub.js";

const mock$ = vi.fn();

vi.mock("execa", () => ({
	get $() {
		return mock$;
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
	it("uses gh auth token when available", async () => {
		const auth = "abc123";
		mock$.mockResolvedValueOnce({ stdout: auth });

		const actual = await getGitHub();

		expect(actual).toEqual({ auth, octokit: new MockOctokit({ auth }) });
	});

	it("uses process.env.GH_TOKEN when available and gh auth token rejects", async () => {
		const auth = "abc123";
		mock$.mockRejectedValueOnce(new Error("Oh no!"));
		process.env.GH_TOKEN = auth;

		const actual = await getGitHub();

		expect(actual).toEqual({ auth, octokit: new MockOctokit({ auth }) });
	});

	it("throws an error when both process.env.GH_TOKEN and gh auth token reject", async () => {
		mock$.mockRejectedValueOnce(new Error("Oh no!"));
		process.env.GH_TOKEN = "";

		await expect(getGitHub).rejects.toMatchInlineSnapshot(
			`[Error: Couldn't authenticate with GitHub. Either log in with \`gh auth login\` (https://cli.github.com) or set a GH_TOKEN environment variable.]`,
		);
	});
});
