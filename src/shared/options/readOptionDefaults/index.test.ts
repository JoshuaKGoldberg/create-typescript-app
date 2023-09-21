import { describe, expect, it, vi } from "vitest";

import { readOptionDefaults } from "./index.js";

const mock$ = vi.fn();

vi.mock("execa", () => ({
	get $() {
		return mock$;
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

describe("readOptionDefaults", () => {
	describe("email", () => {
		it("returns the npm whoami email from npm when only an npm exists", async () => {
			mock$.mockImplementation(([command]: string[]) =>
				command === "npm whoami" ? { stdout: "npm-username" } : undefined,
			);
			mockNpmUser.mockImplementation((username: string) => ({
				email: `test@${username}.com`,
			}));

			const actual = await readOptionDefaults().email();

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

			const actual = await readOptionDefaults().email();

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

			const actual = await readOptionDefaults().email();

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

			const actual = await readOptionDefaults().email();

			expect(actual).toEqual({
				github: "test@git.com",
				npm: "test@npm-username.com",
			});
		});

		it("returns undefined when neither git nor npm emails exist", async () => {
			mock$.mockResolvedValue({ stdout: "" });
			mockReadPackageData.mockResolvedValue({});

			const actual = await readOptionDefaults().email();

			expect(actual).toBeUndefined();
		});
	});
});
