import { describe, expect, it, vi } from "vitest";

import { StatusCodes } from "../shared/codes.js";
import { migrate } from "./index.js";

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

const mockMigrateAndEnterRepository = vi.fn();

vi.mock("./migrateAndEnterRepository.js", () => ({
	get migrateAndEnterRepository() {
		return mockMigrateAndEnterRepository;
	},
}));

const optionsBase = {
	repository: "TestRepository",
};

describe("migrate", () => {
	it("returns a cancellation code when readOptions cancels", async () => {
		mockReadOptions.mockResolvedValue({
			cancelled: true,
			options: optionsBase,
		});

		const result = await migrate([]);

		expect(result).toEqual({
			code: StatusCodes.Cancelled,
			options: optionsBase,
		});
	});
});
