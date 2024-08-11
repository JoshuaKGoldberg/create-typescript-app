import { beforeEach, describe, expect, it, vi } from "vitest";

import { createOptionDefaults } from "./index.js";

const mock$ = vi.fn();

vi.mock("execa", () => ({
	get $() {
		return mock$;
	},
}));

const mockGitUrlParse = vi.fn();

vi.mock("git-url-parse", () => ({
	get default() {
		return mockGitUrlParse;
	},
}));

const mockNpmUser = vi.fn();

vi.mock("npm-user", () => ({
	get default() {
		return mockNpmUser;
	},
}));

const mockReadPackageData = vi.fn();

vi.mock("../../packages.js", () => ({
	get readPackageData() {
		return mockReadPackageData;
	},
}));

const mockReadGitHubEmail = vi.fn();

vi.mock("./readGitHubEmail.js", () => ({
	get readGitHubEmail() {
		return mockReadGitHubEmail;
	},
}));

describe("createOptionDefaults", () => {
	describe("bin", () => {
		it("returns undefined when package data does not have a bin", async () => {
			mockReadPackageData.mockResolvedValue({});

			const actual = await createOptionDefaults().bin();

			expect(actual).toBeUndefined();
		});

		it("returns the bin when package data has a bin", async () => {
			const bin = "./lib/index.js";

			mockReadPackageData.mockResolvedValue({ bin });

			const actual = await createOptionDefaults().bin();

			expect(actual).toBe(bin);
		});
	});

	describe("email", () => {
		beforeEach(() => {
			mockNpmUser.mockImplementation((username: string) => ({
				email: `npm-${username}@test.com`,
			}));
		});

		it("returns the npm whoami email from npm when only an npm exists", async () => {
			mock$.mockImplementation(([command]: string[]) =>
				command === "npm whoami" ? { stdout: "username" } : undefined,
			);
			mockReadGitHubEmail.mockResolvedValueOnce(undefined);

			const actual = await createOptionDefaults().email();

			expect(actual).toEqual({
				github: "npm-username@test.com",
				npm: "npm-username@test.com",
			});
		});

		it("returns the npm whoami email from npm when only a package author email exists", async () => {
			mock$.mockResolvedValue({ stdout: "" });
			mockReadGitHubEmail.mockResolvedValueOnce(undefined);
			mockReadPackageData.mockResolvedValue({
				author: {
					email: "test@package.com",
				},
			});

			const actual = await createOptionDefaults().email();

			expect(actual).toEqual({
				github: "test@package.com",
				npm: "test@package.com",
			});
		});

		it("returns the github email when only a github email exists", async () => {
			mock$.mockResolvedValue({ stdout: "" });
			mockReadPackageData.mockResolvedValueOnce({});
			mockReadGitHubEmail.mockResolvedValueOnce("github@test.com");

			const actual = await createOptionDefaults().email();

			expect(actual).toEqual({
				github: "github@test.com",
				npm: "github@test.com",
			});
		});

		it("returns the git user email when only a git user email exists", async () => {
			mock$.mockImplementation(([command]: string[]) =>
				command === "git config --get user.email"
					? { stdout: "git@test.com" }
					: undefined,
			);
			mockReadGitHubEmail.mockResolvedValueOnce(undefined);
			mockReadPackageData.mockResolvedValue({});

			const actual = await createOptionDefaults().email();

			expect(actual).toEqual({
				github: "git@test.com",
				npm: "git@test.com",
			});
		});

		it("returns both the git user email and the npm user email when only those two exist", async () => {
			mock$.mockImplementation(([command]: string[]) => ({
				stdout:
					command === "git config --get user.email"
						? "git@test.com"
						: "username",
			}));
			mockReadGitHubEmail.mockResolvedValueOnce(undefined);
			mockReadPackageData.mockResolvedValue({});

			const actual = await createOptionDefaults().email();

			expect(actual).toEqual({
				github: "git@test.com",
				npm: "npm-username@test.com",
			});
		});

		it("returns all three emails when they all exist", async () => {
			mock$.mockImplementation(([command]: string[]) => ({
				stdout:
					command === "git config --get user.email"
						? "git@test.com"
						: "username",
			}));
			mockReadGitHubEmail.mockResolvedValueOnce("github@test.com");
			mockReadPackageData.mockResolvedValue({});

			const actual = await createOptionDefaults().email();

			expect(actual).toEqual({
				github: "github@test.com",
				npm: "npm-username@test.com",
			});
		});

		it("returns undefined when none of the emails exist", async () => {
			mock$.mockResolvedValue({ stdout: "" });
			mockReadGitHubEmail.mockResolvedValueOnce(undefined);
			mockReadPackageData.mockResolvedValue({});

			const actual = await createOptionDefaults().email();

			expect(actual).toBeUndefined();
		});
	});

	describe("repository", () => {
		it("returns promptedOptions.repository when it exists", async () => {
			const repository = "test-prompted-repository";
			const promptedOptions = { repository };
			const actual = await createOptionDefaults(promptedOptions).repository();

			expect(actual).toBe(repository);
		});

		it("returns the Git name when it exists and promptedOptions.repository doesn't", async () => {
			const name = "test-git-repository";
			mockGitUrlParse.mockResolvedValueOnce({ name });

			const actual = await createOptionDefaults().repository();

			expect(actual).toBe(name);
		});

		it("returns the package name when it exists and promptedOptions.repository a Git name don't", async () => {
			const name = "test-package-name";
			mockReadPackageData.mockResolvedValueOnce({ name });

			const actual = await createOptionDefaults().repository();

			expect(actual).toBe(name);
		});
	});
});
