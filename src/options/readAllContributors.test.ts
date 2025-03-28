import { createMockSystems } from "bingo-testers";
import { describe, expect, it, vi } from "vitest";

import { startingOwnerContributions } from "../data/contributions.js";
import { readAllContributors } from "./readAllContributors.js";

const mockInputFromFileJSON = vi.fn();

vi.mock("input-from-file-json", () => ({
	get inputFromFileJSON() {
		return mockInputFromFileJSON;
	},
}));

const mockInputFromOctokit = vi.fn();

vi.mock("../inputs/inputFromOctokit.js", () => ({
	get inputFromOctokit() {
		return mockInputFromOctokit;
	},
}));

const { take } = createMockSystems();

describe(readAllContributors, () => {
	it("returns contributors from .all-contributorsrc when it can be read", async () => {
		const contributors = ["a", "b", "c"];
		mockInputFromFileJSON.mockResolvedValueOnce({ contributors });

		const actual = await readAllContributors(take);

		expect(actual).toEqual(contributors);
		expect(mockInputFromOctokit).not.toHaveBeenCalled();
	});

	it("returns undefined when .all-contributorsrc cannot be read and GET /user resolves undefined", async () => {
		mockInputFromFileJSON.mockResolvedValueOnce(new Error("Oh no!"));
		mockInputFromOctokit.mockResolvedValueOnce(undefined);

		const actual = await readAllContributors(take);

		expect(actual).toBeUndefined();
	});

	it("returns the current user as a contributor when .all-contributorsrc cannot be read and GET /user resolves a user", async () => {
		mockInputFromFileJSON.mockResolvedValueOnce(new Error("Oh no!"));
		mockInputFromOctokit.mockResolvedValueOnce({
			avatar_url: "avatar_url",
			blog: "blog",
			login: "login",
			name: "name",
		});

		const actual = await readAllContributors(take);

		expect(actual).toEqual([
			{
				avatar_url: "avatar_url",
				contributions: startingOwnerContributions,
				login: "login",
				name: "name",
				profile: "blog",
			},
		]);
	});
});
