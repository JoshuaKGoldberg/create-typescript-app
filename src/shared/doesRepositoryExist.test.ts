import { Octokit } from "octokit";
import { describe, expect, it, MockInstance, vi } from "vitest";

import { doesRepositoryExist } from "./doesRepositoryExist.js";

const createMockOctokit = (
	repos: Partial<Record<keyof Octokit["rest"]["repos"], MockInstance>>,
) =>
	({
		rest: {
			repos,
		},
	}) as unknown as Octokit;

const owner = "StubOwner";
const repository = "stub-repository";

describe("doesRepositoryExist", () => {
	it("returns true when the octokit GET resolves", async () => {
		const octokit = createMockOctokit({ get: vi.fn().mockResolvedValue({}) });

		const actual = await doesRepositoryExist(octokit, { owner, repository });

		expect(actual).toBe(true);
	});

	it("returns false when the octokit GET rejects with a 404", async () => {
		const octokit = createMockOctokit({
			get: vi.fn().mockRejectedValue({ status: 404 }),
		});

		const actual = await doesRepositoryExist(octokit, { owner, repository });

		expect(actual).toBe(false);
	});

	it("throws the error when awaiting the octokit GET throws a non-404 error", async () => {
		const error = new Error("Oh no!");
		const octokit = createMockOctokit({
			get: vi.fn().mockRejectedValue(error),
		});

		await expect(
			async () => await doesRepositoryExist(octokit, { owner, repository }),
		).rejects.toEqual(error);
	});
});
