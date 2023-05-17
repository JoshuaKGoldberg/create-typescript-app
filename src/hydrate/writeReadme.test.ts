import chalk from "chalk";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { RepositorySettings } from "./repositorySettings.js";
import { writeReadme } from "./writeReadme.js";

const mockFsWriteFile = vi.fn();

vi.mock("node:fs/promises", () => ({
	get writeFile() {
		return mockFsWriteFile;
	},
}));

const mockReadFileSafe = vi.fn();

vi.mock("./readFileSafe.js", () => ({
	get readFileSafe() {
		return mockReadFileSafe;
	},
}));

const mockConsoleLog = vi.fn();

const settings: RepositorySettings = {
	author: "Test Author",
	description: "test description",
	email: "test@email.com",
	funding: "TestFunding",
	owner: "TestOwner",
	releases: true,
	repository: "test-repository",
	title: "Test Title",
	unitTests: true,
};

describe("writeReadme", () => {
	beforeEach(() => {
		console.log = mockConsoleLog;
	});

	it("creates a new readme when one doesn't yet exist", async () => {
		mockReadFileSafe.mockReturnValueOnce(undefined);

		await writeReadme(settings);

		expect(console.log).toHaveBeenCalledWith(
			chalk.gray("README.md doesn't appear to exist; creating.")
		);
	});

	it("adds a new contributors section when one doesn't yet exist", async () => {
		mockReadFileSafe.mockReturnValueOnce("# Test Title");

		await writeReadme(settings);

		expect(console.log).toHaveBeenCalledWith(
			chalk.gray("README.md doesn't appear have Contributors section; adding.")
		);
	});
});
