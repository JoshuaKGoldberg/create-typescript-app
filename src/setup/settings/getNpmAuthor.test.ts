import chalk from "chalk";
import { beforeEach, describe, expect, it, SpyInstance, vi } from "vitest";

import { getNpmAuthor } from "./getNpmAuthor.js";

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

let mockConsoleLog: SpyInstance;

const npmUsername = "test-npm-username";
const owner = "test-owner";

describe("getNpmAuthor", () => {
	beforeEach(() => {
		mockConsoleLog = vi
			.spyOn(console, "log")
			.mockImplementation(() => undefined);
	});

	it("logs and defaults to owner when npm whoami fails", async () => {
		mock$.mockRejectedValue({ stderr: "Oh no!" });

		const author = await getNpmAuthor(owner);

		expect(author).toBe(owner);
		expect(mockConsoleLog).toHaveBeenCalledWith(chalk.gray("│"));
		expect(mockConsoleLog).toHaveBeenCalledWith(
			chalk.gray("│  Could not populate npm user. Failed to run npm whoami.")
		);
	});

	it("logs and defaults to owner when retrieving the npm whoami user fails", async () => {
		mock$.mockResolvedValue({ stdout: npmUsername });
		mockNpmUser.mockRejectedValue("Oh no!");

		const author = await getNpmAuthor(owner);

		expect(author).toBe(owner);
		expect(mockConsoleLog).toHaveBeenCalledWith(chalk.gray("│"));
		expect(mockConsoleLog).toHaveBeenCalledWith(
			chalk.gray(
				"│  Could not populate npm user. Failed to retrieve user info from npm."
			)
		);
	});

	it("returns npm user info when retrieving the npm whoami user succeeds", async () => {
		const name = "Test Author <test@test.test>";

		mock$.mockResolvedValue({ stdout: npmUsername });
		mockNpmUser.mockResolvedValue({ name });

		const author = await getNpmAuthor(owner);

		expect(author).toBe(name);
		expect(mockConsoleLog).not.toHaveBeenCalled();
	});
});
