import { describe, expect, it, vi } from "vitest";

import { addToolAllContributors } from "./addToolAllContributors.js";

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

describe("addToolAllContributors", () => {
	it("adds JoshuaKGoldberg when that is not the current github user", async () => {
		mockGetGitHubUserAsAllContributor.mockResolvedValue("JoshuaKGoldberg");

		await addToolAllContributors(undefined, { owner: "owner" });

		expect(mock$).not.toHaveBeenCalled();
	});

	it("does not add JoshuaKGoldberg when that not the current github user", async () => {
		mockGetGitHubUserAsAllContributor.mockResolvedValue("other");

		await addToolAllContributors(undefined, { owner: "owner" });

		expect(mock$).toHaveBeenCalledWith([
			`npx -y all-contributors-cli add JoshuaKGoldberg tool`,
		]);
	});
});
