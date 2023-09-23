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

const mockCreateAndEnterRepository = vi.fn();

vi.mock("./createAndEnterRepository.js", () => ({
	get createAndEnterRepository() {
		return mockCreateAndEnterRepository;
	},
}));

const optionsBase = {
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

	it("returns a failure code when createAndEnterRepository returns false", async () => {
		mockReadOptions.mockResolvedValue({
			cancelled: false,
			options: optionsBase,
		});

		mockCreateAndEnterRepository.mockResolvedValue(false);

		const result = await create([]);

		expect(result).toEqual({
			code: StatusCodes.Failure,
			options: optionsBase,
		});
		expect(mockOutro).toHaveBeenCalledWith(
			chalk.red(
				"The TestRepository directory already exists. Please remove the directory or try a different name.",
			),
		);
	});
});
