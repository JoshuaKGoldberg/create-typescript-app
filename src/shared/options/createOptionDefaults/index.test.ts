import { describe, expect, it, vi } from "vitest";

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
		it("returns the npm whoami email from npm when only an npm exists", async () => {
			mock$.mockImplementation(([command]: string[]) =>
				command === "npm whoami" ? { stdout: "npm-username" } : undefined,
			);
			mockNpmUser.mockImplementation((username: string) => ({
				email: `test@${username}.com`,
			}));

			const actual = await createOptionDefaults().email();

			expect(actual).toEqual({
				github: "test@npm-username.com",
				npm: "test@npm-username.com",
			});
		});

		it("returns the npm whoami email from npm when only a package author email exists", async () => {
			mock$.mockResolvedValue({ stdout: "" });
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

		it("returns the git user email when only a git user email exists", async () => {
			mock$.mockImplementation(([command]: string[]) =>
				command === "git config --get user.email"
					? { stdout: "test@git.com" }
					: undefined,
			);
			mockReadPackageData.mockResolvedValue({});

			const actual = await createOptionDefaults().email();

			expect(actual).toEqual({
				github: "test@git.com",
				npm: "test@git.com",
			});
		});

		it("returns both the git user email and the npm user email when both exist", async () => {
			mock$.mockImplementation(([command]: string[]) => ({
				stdout:
					command === "git config --get user.email"
						? "test@git.com"
						: "npm-username",
			}));
			mockReadPackageData.mockResolvedValue({});

			const actual = await createOptionDefaults().email();

			expect(actual).toEqual({
				github: "test@git.com",
				npm: "test@npm-username.com",
			});
		});

		it("returns undefined when neither git nor npm emails exist", async () => {
			mock$.mockResolvedValue({ stdout: "" });
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
