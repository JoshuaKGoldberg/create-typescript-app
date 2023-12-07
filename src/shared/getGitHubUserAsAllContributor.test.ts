import chalk from "chalk";
import { MockInstance, beforeEach, describe, expect, it, vi } from "vitest";

import { getGitHubUserAsAllContributor } from "./getGitHubUserAsAllContributor.js";

const mock$ = vi.fn();

vi.mock("execa", () => ({
	get $() {
		return mock$;
	},
}));

let mockConsoleWarn: MockInstance;

const owner = "TestOwner";

describe("getGitHubUserAsAllContributor", () => {
	beforeEach(() => {
		mockConsoleWarn = vi
			.spyOn(console, "warn")
			.mockImplementation(() => undefined);
	});

	it("defaults to owner with a log when options.offline is true", async () => {
		const actual = await getGitHubUserAsAllContributor({
			offline: true,
			owner,
		});

		expect(actual).toEqual(owner);
		expect(mockConsoleWarn).toHaveBeenCalledWith(
			chalk.gray(
				`Skipping populating all-contributors contributions for TestOwner because in --offline mode.`,
			),
		);
	});

	it("uses the user from gh api user when it succeeds", async () => {
		const login = "gh-api-user";

		mock$.mockResolvedValueOnce({
			stdout: JSON.stringify({ login }),
		});

		await getGitHubUserAsAllContributor({ owner });

		expect(mockConsoleWarn).not.toHaveBeenCalled();
		expect(mock$.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    [
			      "gh api user",
			    ],
			  ],
			  [
			    [
			      "npx -y all-contributors-cli@6.25 add ",
			      " ",
			      "",
			    ],
			    "gh-api-user",
			    "code,content,doc,ideas,infra,maintenance,projectManagement,tool",
			  ],
			]
		`);
	});

	it("defaults the user to the owner when gh api user fails", async () => {
		mock$.mockRejectedValueOnce({});

		await getGitHubUserAsAllContributor({ owner });

		expect(mockConsoleWarn).toHaveBeenCalledWith(
			chalk.gray(
				`Couldn't authenticate GitHub user, falling back to the provided owner name '${owner}'.`,
			),
		);
		expect(mock$.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    [
			      "gh api user",
			    ],
			  ],
			  [
			    [
			      "npx -y all-contributors-cli@6.25 add ",
			      " ",
			      "",
			    ],
			    "TestOwner",
			    "code,content,doc,ideas,infra,maintenance,projectManagement,tool",
			  ],
			]
		`);
	});
});
