import { githubDefaultLabels } from "github-default-labels";
import { describe, expect, it, vi } from "vitest";

import { inputFromOctokit } from "../inputs/inputFromOctokit.js";
import { getExistingLabels } from "./getExistingLabels.js";

const owner = "TestOwner";
const repository = "test-repository";

describe(getExistingLabels, () => {
	it("returns default labels when owner is undefined", async () => {
		const take = vi.fn();

		const actual = await getExistingLabels(take, undefined, repository);

		expect(actual).toBe(githubDefaultLabels);
		expect(take).not.toHaveBeenCalled();
	});

	it("returns default labels when repository is undefined", async () => {
		const take = vi.fn();

		const actual = await getExistingLabels(take, owner, undefined);

		expect(actual).toBe(githubDefaultLabels);
		expect(take).not.toHaveBeenCalled();
	});

	it("returns default labels when owner and repository are defined but the GET call fails", async () => {
		const take = vi.fn().mockResolvedValueOnce(undefined);

		const actual = await getExistingLabels(take, owner, repository);

		expect(actual).toBe(githubDefaultLabels);
		expect(take).toHaveBeenCalledWith(inputFromOctokit, {
			endpoint: "GET /repos/{owner}/{repo}/labels",
			options: {
				owner,
				repo: repository,
			},
		});
	});

	it("returns the repository's labels when owner and repository are defined and the GET call succeeds", async () => {
		const labels = [
			{ color: "ffffff", description: "Welcome!", name: "good first issue" },
		];
		const take = vi.fn().mockResolvedValueOnce(labels);

		const actual = await getExistingLabels(take, owner, repository);

		expect(actual).toEqual(labels);
		expect(take).toHaveBeenCalledWith(inputFromOctokit, {
			endpoint: "GET /repos/{owner}/{repo}/labels",
			options: {
				owner,
				repo: repository,
			},
		});
	});
});
