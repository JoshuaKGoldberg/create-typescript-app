import { Octokit } from "octokit";
import { describe, expect, it, vi } from "vitest";

import { getOctokit } from "./getOctokit.js";

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

		await expect(getOctokit).rejects.toMatchInlineSnapshot(
			"[Error: GitHub authentication failed.]",
		);
	});

	it("returns a new Octokit when gh auth status succeeds", async () => {
		const auth = "abc123";
		mock$.mockResolvedValueOnce({}).mockResolvedValueOnce({ stdout: auth });

		const actual = await getOctokit();

		expect(actual).toEqual(new Octokit({ auth }));
	});
});
