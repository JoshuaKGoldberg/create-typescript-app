import { describe, expect, it, vi } from "vitest";

import { addAllContributors } from "./addAllContributors.js";

const mock$ = vi.fn();

vi.mock("execa", () => ({
	get $() {
		return mock$;
	},
}));

const mockGetGitHubUserAsAllContributor = vi.fn();

vi.mock("../shared/getGitHubUserAsAllContributor.js", () => ({
	get getGitHubUserAsAllContributor() {
		return mockGetGitHubUserAsAllContributor;
	},
}));

describe("addAllContributors", () => {
	it("adds JoshuaKGoldberg when that is not the current github user", async () => {
		mockGetGitHubUserAsAllContributor.mockResolvedValue("JoshuaKGoldberg");

		await addAllContributors("owner");

		expect(mock$).not.toHaveBeenCalled();
	});

	it("does not add JoshuaKGoldberg when that not the current github user", async () => {
		mockGetGitHubUserAsAllContributor.mockResolvedValue("other");

		await addAllContributors("owner");

		expect(mock$).toHaveBeenCalledWith([
			`npx all-contributors add JoshuaKGoldberg tool`,
		]);
	});
});
