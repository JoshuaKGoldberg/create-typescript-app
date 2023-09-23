import { describe, expect, it, vi } from "vitest";

import { detectExistingContributors } from "./detectExistingContributors.js";

const mockGetAllContributorsForRepository = vi.fn();

vi.mock("all-contributors-for-repository", () => ({
	get getAllContributorsForRepository() {
		return mockGetAllContributorsForRepository;
	},
}));

const mock$ = vi.fn().mockImplementation(() => mock$);

vi.mock("execa", () => ({
	get $() {
		return mock$;
	},
}));

const options = {
	owner: "TestOwner",
	repository: "test-repository",
};

describe("detectExistingContributors", () => {
	it("runs npx all-contributors add for each contributor and contribution type", async () => {
		mockGetAllContributorsForRepository.mockResolvedValue({
			username: ["bug", "docs"],
		});

		await detectExistingContributors("auth-token", options);

		expect(mock$.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    {
			      "env": {
			        "PRIVATE_TOKEN": "auth-token",
			      },
			    },
			  ],
			  [
			    [
			      "npx -y all-contributors-cli add ",
			      " ",
			      "",
			    ],
			    "username",
			    "0,1",
			  ],
			]
		`);
	});
});
