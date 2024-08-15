import chalk from "chalk";
import { Octokit } from "octokit";
import { beforeEach, describe, expect, it, MockInstance, vi } from "vitest";

import { getGitHubUserAsAllContributor } from "./getGitHubUserAsAllContributor.js";

const mock$ = vi.fn();

vi.mock("execa", () => ({
	get $() {
		return mock$;
	},
}));

let mockConsoleWarn: MockInstance;

const createMockOctokit = (getAuthenticated: MockInstance = vi.fn()) =>
	({
		rest: { users: { getAuthenticated } },
	}) as unknown as Octokit;

const owner = "TestOwner";

describe("getGitHubUserAsAllContributor", () => {
	beforeEach(() => {
		mockConsoleWarn = vi
			.spyOn(console, "warn")
			.mockImplementation(() => undefined);
	});

	it("defaults to owner with a log when options.offline is true", async () => {
		const octokit = createMockOctokit();
		const actual = await getGitHubUserAsAllContributor(octokit, {
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

	it("defaults to owner without a log when octokit is undefined", async () => {
		const actual = await getGitHubUserAsAllContributor(undefined, { owner });

		expect(actual).toEqual(owner);
		expect(mockConsoleWarn).not.toHaveBeenCalled();
	});

	it("uses the user from gh api user when it succeeds", async () => {
		const login = "gh-api-user";
		const octokit = createMockOctokit(
			vi.fn().mockResolvedValue({ data: { login } }),
		);

		await getGitHubUserAsAllContributor(octokit, { owner });

		expect(mockConsoleWarn).not.toHaveBeenCalled();
		expect(mock$.mock.calls).toMatchInlineSnapshot(`
			[
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
		const octokit = createMockOctokit(
			vi.fn().mockRejectedValue(new Error("Oh no!")),
		);

		await getGitHubUserAsAllContributor(octokit, { owner });

		expect(mockConsoleWarn).toHaveBeenCalledWith(
			chalk.gray(
				`Couldn't authenticate GitHub user, falling back to the provided owner name '${owner}'.`,
			),
		);
		expect(mock$.mock.calls).toMatchInlineSnapshot(`
			[
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
