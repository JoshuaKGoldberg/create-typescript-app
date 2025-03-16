import { githubDefaultLabels } from "github-default-labels";
import { describe, expect, it, vi } from "vitest";

import { inputFromOctokit } from "../inputs/inputFromOctokit.js";
import { readExistingLabels } from "./readExistingLabels.js";

const owner = "TestOwner";
const repository = "test-repository";

describe(readExistingLabels, () => {
	it("returns default labels when owner is undefined", async () => {
		const take = vi.fn();

		const actual = await readExistingLabels(
			take,
			() => Promise.resolve(undefined),
			() => Promise.resolve(repository),
		);

		expect(actual).toBe(githubDefaultLabels);
		expect(take).not.toHaveBeenCalled();
	});

	it("returns default labels when repository is undefined", async () => {
		const take = vi.fn();

		const actual = await readExistingLabels(
			take,
			() => Promise.resolve(owner),
			() => Promise.resolve(undefined),
		);

		expect(actual).toBe(githubDefaultLabels);
		expect(take).not.toHaveBeenCalled();
	});

	it("returns default labels when owner and repository are defined but the GET call fails", async () => {
		const take = vi.fn().mockResolvedValueOnce(undefined);

		const actual = await readExistingLabels(
			take,
			() => Promise.resolve(owner),
			() => Promise.resolve(repository),
		);

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

		const actual = await readExistingLabels(
			take,
			() => Promise.resolve(owner),
			() => Promise.resolve(repository),
		);

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
