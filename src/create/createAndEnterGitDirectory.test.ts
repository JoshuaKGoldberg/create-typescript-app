import { describe, expect, it, vi } from "vitest";

import { createAndEnterGitDirectory } from "./createAndEnterGitDirectory.js";

const mockMkdir = vi.fn();
const mockReaddir = vi.fn();

vi.mock("node:fs/promises", () => ({
	get mkdir() {
		return mockMkdir;
	},
	get readdir() {
		return mockReaddir;
	},
}));

const mockChdir = vi.fn();

vi.mock("node:process", () => ({
	get chdir() {
		return mockChdir;
	},
}));

describe("createAndEnterGitDirectory", () => {
	it("returns false and doesn't run fs.mkdir when the directory is '.' and has children", async () => {
		mockReaddir.mockResolvedValueOnce(["file"]);

		const actual = await createAndEnterGitDirectory(".");

		expect(actual).toBe(false);
		expect(mockMkdir).not.toHaveBeenCalled();
	});

	it("returns true and doesn't run fs.mkdir when the directory is '.' and is empty", async () => {
		mockReaddir.mockResolvedValueOnce([]);

		const actual = await createAndEnterGitDirectory(".");

		expect(actual).toBe(true);
		expect(mockMkdir).not.toHaveBeenCalled();
	});

	it("returns false and doesn't run fs.chdir when the directory is a child directory with children", async () => {
		const directory = "dir";
		mockReaddir
			.mockResolvedValueOnce([directory])
			.mockResolvedValueOnce(["file"]);

		const actual = await createAndEnterGitDirectory(directory);

		expect(actual).toBe(false);
		expect(mockChdir).not.toHaveBeenCalled();
	});

	it("returns true and runs fs.chdir when the directory is a child directory that doesn't exist", async () => {
		const directory = "dir";
		mockReaddir.mockResolvedValueOnce([directory]).mockResolvedValueOnce([]);

		const actual = await createAndEnterGitDirectory(directory);

		expect(actual).toBe(true);
		expect(mockChdir).toHaveBeenCalledWith(directory);
	});
});
