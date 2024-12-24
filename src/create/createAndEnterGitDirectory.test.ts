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
const mockCwd = "/path/to/cwd";

vi.mock("node:process", () => ({
	get chdir() {
		return mockChdir;
	},
	cwd() {
		return mockCwd;
	},
}));

const mock$$ = vi.fn();

const mock$ = vi.fn().mockReturnValue(mock$$);

vi.mock("execa", () => ({
	get $() {
		return mock$;
	},
}));

describe("createAndEnterGitDirectory", () => {
	it("returns false and doesn't run fs.mkdir when the directory is '.' and has children", async () => {
		mockReaddir.mockResolvedValueOnce(["file"]);

		const actual = await createAndEnterGitDirectory(".");

		expect(actual).toBeUndefined();
		expect(mockMkdir).not.toHaveBeenCalled();
	});

	it("returns true and doesn't run fs.mkdir when the directory is '.' and is empty", async () => {
		mockReaddir.mockResolvedValueOnce([]);

		const actual = await createAndEnterGitDirectory(".");

		expect(actual).toBe(mockCwd);
		expect(mockMkdir).not.toHaveBeenCalled();
	});

	it("returns false and doesn't run process.chdir when the directory is a child directory with children", async () => {
		const directory = "dir";
		mockReaddir
			.mockResolvedValueOnce([directory])
			.mockResolvedValueOnce(["file"]);

		const actual = await createAndEnterGitDirectory(directory);

		expect(actual).toBeUndefined();
		expect(mockChdir).not.toHaveBeenCalled();
		expect(mock$).not.toHaveBeenCalled();
	});

	it("returns true and runs process.chdir when the directory is a child directory that doesn't exist", async () => {
		const directory = "dir";
		mockReaddir.mockResolvedValueOnce([directory]).mockResolvedValueOnce([]);

		const actual = await createAndEnterGitDirectory(directory);

		expect(actual).toBe(mockCwd);
		expect(mockChdir).toHaveBeenCalledWith(directory);
		expect(mock$).toHaveBeenCalledWith({ cwd: mockCwd });
		expect(mock$$).toHaveBeenCalledWith(["git init -b main"]);
	});
});
