import chalk from "chalk";
import { describe, expect, it, vi } from "vitest";

import { StatusCodes } from "../shared/codes.js";
import { create } from "./index.js";

const mockOutro = vi.fn();

vi.mock("@clack/prompts", () => ({
	get outro() {
		return mockOutro;
	},
	spinner: vi.fn(),
}));

const mockReadOptions = vi.fn();

vi.mock("../shared/options/readOptions.js", () => ({
	get readOptions() {
		return mockReadOptions;
	},
}));

const mockCreateAndEnterGitDirectory = vi.fn();

vi.mock("./createAndEnterGitDirectory.js", () => ({
	get createAndEnterGitDirectory() {
		return mockCreateAndEnterGitDirectory;
	},
}));

const optionsBase = {
	directory: "TestDirectory",
	repository: "TestRepository",
};

describe("create", () => {
	it("returns a cancellation code when readOptions cancels", async () => {
		mockReadOptions.mockResolvedValue({
			cancelled: true,
			options: optionsBase,
		});

		const result = await create([]);

		expect(result).toEqual({
			code: StatusCodes.Cancelled,
			options: optionsBase,
		});
	});

	it("returns a failure code when createAndEnterGitDirectory returns false", async () => {
		mockReadOptions.mockResolvedValue({
			cancelled: false,
			options: optionsBase,
		});

		mockCreateAndEnterGitDirectory.mockResolvedValue(false);

		const result = await create([]);

		expect(result).toEqual({
			code: StatusCodes.Failure,
			options: optionsBase,
		});
		expect(mockOutro).toHaveBeenCalledWith(
			chalk.red(
				"The TestDirectory directory already exists and is not empty. Please clear the directory, run with --mode initialize, or try a different directory.",
			),
		);
	});
});
