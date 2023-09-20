import { Octokit } from "octokit";
import { describe, expect, it, vi } from "vitest";

import { getGitHub } from "./getGitHub.js";

const mock$ = vi.fn();

vi.mock("execa", () => ({
	get $() {
		return mock$;
	},
}));

vi.mock("octokit");

describe("getOctokit", () => {
	it("throws an error when gh auth status fails", async () => {
		mock$.mockRejectedValueOnce(new Error("Oh no!"));

		await expect(getGitHub).rejects.toMatchInlineSnapshot(
			"[Error: GitHub authentication failed.]",
		);
	});

	it("returns a new Octokit when gh auth status succeeds", async () => {
		const auth = "abc123";
		mock$.mockResolvedValueOnce({}).mockResolvedValueOnce({ stdout: auth });

		const actual = await getGitHub();

		expect(actual).toEqual({ auth, octokit: new Octokit({ auth }) });
	});
});
