import { describe, expect, it, vi } from "vitest";

import { StatusCodes } from "../shared/codes.js";
import { initialize } from "./index.js";

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

const mockInitializeAndEnterRepository = vi.fn();

vi.mock("./initializeAndEnterRepository.js", () => ({
	get initializeAndEnterRepository() {
		return mockInitializeAndEnterRepository;
	},
}));

const optionsBase = {
	repository: "TestRepository",
};

describe("initialize", () => {
	it("returns a cancellation code when readOptions cancels", async () => {
		mockReadOptions.mockResolvedValue({
			cancelled: true,
			options: optionsBase,
		});

		const result = await initialize([]);

		expect(result).toEqual({
			code: StatusCodes.Cancelled,
			options: optionsBase,
		});
	});
});
