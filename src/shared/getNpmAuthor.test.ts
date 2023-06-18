import chalk from "chalk";
import { SpyInstance, beforeEach, describe, expect, it, vi } from "vitest";

import { getNpmAuthor } from "./getNpmAuthor.js";

const mockNpmUserInfo = vi.fn();

vi.mock("./getNpmUserInfo", () => ({
	get getNpmUserInfo() {
		return mockNpmUserInfo;
	},
}));

let mockConsoleLog: SpyInstance;

const owner = "test-owner";

describe("getNpmAuthor", () => {
	beforeEach(() => {
		mockConsoleLog = vi
			.spyOn(console, "log")
			.mockImplementation(() => undefined);
	});

	it("logs and defaults to owner when getNpmUserInfo fails", async () => {
		mockNpmUserInfo.mockResolvedValue({
			reason: "Some reason",
			succeeded: false,
		});

		const author = await getNpmAuthor(owner);

		expect(author).toBe(owner);
		expect(mockConsoleLog).toHaveBeenCalledWith(
			[chalk.gray("│"), chalk.gray("Some reason")].join("  ")
		);
	});

	it("returns npm user info with only name when no email available for npm user", async () => {
		const name = "Test Author";
		mockNpmUserInfo.mockResolvedValue({
			succeeded: true,
			value: { name },
		});

		const author = await getNpmAuthor(owner);
		expect(author).toBe(name);
		expect(mockConsoleLog).not.toHaveBeenCalled();
	});

	it("returns npm user info when getNpmUserInfo succeeds and contains all information", async () => {
		const name = "Test Author";
		const email = "<test@test.test>";
		mockNpmUserInfo.mockResolvedValue({
			succeeded: true,
			value: { email, name },
		});

		const author = await getNpmAuthor(owner);
		expect(author).toBe(`${name} <${email}>`);
		expect(mockConsoleLog).not.toHaveBeenCalled();
	});
});
