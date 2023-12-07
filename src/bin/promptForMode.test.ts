import chalk from "chalk";
import { describe, expect, it, vi } from "vitest";

import { promptForMode } from "./promptForMode.js";

const mockSelect = vi.fn();

vi.mock("@clack/prompts", () => ({
	isCancel: () => false,
	get select() {
		return mockSelect;
	},
}));

const mockReaddir = vi.fn();

vi.mock("node:fs/promises", () => ({
	get readdir() {
		return mockReaddir;
	},
}));

const mockCwd = vi.fn();

vi.mock("node:process", () => ({
	get cwd() {
		return mockCwd;
	},
}));

const mockLogLine = vi.fn();

vi.mock("../shared/cli/lines.js", () => ({
	get logLine() {
		return mockLogLine;
	},
}));
describe("promptForMode", () => {
	it("returns an error when auto exists and input is not migrate", async () => {
		const mode = await promptForMode(true, "create");

		expect(mode).toMatchInlineSnapshot(
			`
			{
			  "mode": [Error: --auto can only be used with --mode migrate.],
			}
		`,
		);
	});

	it("returns an error when the input exists and is not a mode", async () => {
		const mode = await promptForMode(false, "other");

		expect(mode).toMatchInlineSnapshot(
			`
			{
			  "mode": [Error: Unknown --mode: other. Allowed modes are: create, initialize, migrate.],
			}
		`,
		);
	});

	it("returns the input when it is a mode", async () => {
		const input = "create";

		const mode = await promptForMode(false, input);

		expect(mode).toEqual({ mode: input });
	});

	it("returns creating in the current directory when the current directory is empty and the user selects create-current", async () => {
		mockSelect.mockResolvedValueOnce("create-current");
		const directory = "test-directory";

		mockReaddir.mockResolvedValueOnce([]);
		mockCwd.mockReturnValueOnce(`/path/to/${directory}`);

		const actual = await promptForMode(false, undefined);

		expect(actual).toEqual({
			mode: "create",
			options: { directory: ".", repository: directory },
		});
		expect(mockLogLine).not.toHaveBeenCalled();
	});

	it("returns creating in a child directory when the current directory is empty and the user selects create-child", async () => {
		mockSelect.mockResolvedValueOnce("create-child");
		const directory = "test-directory";

		mockReaddir.mockResolvedValueOnce([]);
		mockCwd.mockReturnValueOnce(`/path/to/${directory}`);

		const actual = await promptForMode(false, undefined);

		expect(actual).toEqual({
			mode: "create",
		});
		expect(mockLogLine).not.toHaveBeenCalled();
	});

	it("returns the user selection when the current directory is a Git directory", async () => {
		const mode = "initialize";
		mockSelect.mockResolvedValueOnce(mode);

		mockReaddir.mockResolvedValueOnce([".git"]);

		const actual = await promptForMode(false, undefined);

		expect(actual).toEqual({ mode });
		expect(mockLogLine).not.toHaveBeenCalled();
	});

	it("returns create without prompting when the current directory contains children but is not a Git directory", async () => {
		const mode = "create";

		mockReaddir.mockResolvedValueOnce(["file"]);

		const actual = await promptForMode(false, undefined);

		expect(actual).toEqual({ mode });
		expect(mockSelect).not.toHaveBeenCalled();
		expect(mockLogLine).toHaveBeenCalledWith(
			chalk.gray(
				"Defaulting to --mode create because the directory contains children and isn't a Git repository.",
			),
		);
	});
});
