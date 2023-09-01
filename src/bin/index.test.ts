import chalk from "chalk";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { bin } from "./index.js";

const mockCancel = vi.fn();
const mockOutro = vi.fn();

vi.mock("@clack/prompts", () => ({
	get cancel() {
		return mockCancel;
	},
	intro: vi.fn(),
	log: {
		info: vi.fn(),
	},
	get outro() {
		return mockOutro;
	},
}));

const mockLogLine = vi.fn();

vi.mock("../shared/cli/lines.js", () => ({
	get logLine() {
		return mockLogLine;
	},
}));

const mockCreate = vi.fn();

vi.mock("../create/index.js", () => ({
	get create() {
		return mockCreate;
	},
}));

const mockInitialize = vi.fn();

vi.mock("../initialize/index.js", () => ({
	get initialize() {
		return mockInitialize;
	},
}));

const mockMigrate = vi.fn();

vi.mock("../migrate/index.js", () => ({
	get migrate() {
		return mockMigrate;
	},
}));

const mockPromptForMode = vi.fn();

vi.mock("./mode.js", () => ({
	get promptForMode() {
		return mockPromptForMode;
	},
}));

describe("bin", () => {
	beforeEach(() => {
		vi.spyOn(console, "clear").mockImplementation(() => undefined);
	});

	it("returns 1 when promptForMode returns undefined", async () => {
		mockPromptForMode.mockResolvedValue(undefined);

		const result = await bin([]);

		expect(mockOutro).toHaveBeenCalledWith(
			chalk.red("Operation cancelled. Exiting - maybe another time? 👋"),
		);
		expect(result).toEqual(1);
	});

	it("returns 1 when promptForMode returns an error", async () => {
		const error = new Error("Oh no!");
		mockPromptForMode.mockResolvedValue(error);

		const result = await bin([]);

		expect(mockOutro).toHaveBeenCalledWith(chalk.red(error.message));
		expect(result).toEqual(1);
	});

	it("returns the success result of the corresponding runner without cancel logging when promptForMode returns a mode that succeeds", async () => {
		const mode = "create";
		const args = ["--owner", "abc123"];
		const code = 0;

		mockPromptForMode.mockResolvedValue(mode);
		mockCreate.mockResolvedValue({ code, options: {} });

		const result = await bin(args);

		expect(mockCreate).toHaveBeenCalledWith(args);
		expect(mockCancel).not.toHaveBeenCalled();
		expect(mockInitialize).not.toHaveBeenCalled();
		expect(mockMigrate).not.toHaveBeenCalled();
		expect(result).toEqual(code);
	});

	it("returns the cancel result of the corresponding runner and cancel logs when promptForMode returns a mode that cancels", async () => {
		const mode = "create";
		const args = ["--owner", "abc123"];
		const code = 2;

		mockPromptForMode.mockResolvedValue(mode);
		mockCreate.mockResolvedValue({ code, options: {} });

		const result = await bin(args);

		expect(mockCreate).toHaveBeenCalledWith(args);
		expect(mockCancel).toHaveBeenCalledWith(
			`Operation cancelled. Exiting - maybe another time? 👋`,
		);
		expect(result).toEqual(code);
	});

	it("returns the cancel result of the corresponding runner and cancel logs when promptForMode returns a mode that fails", async () => {
		const mode = "create";
		const args = ["--owner", "abc123"];
		const code = 1;

		mockPromptForMode.mockResolvedValue(mode);
		mockCreate.mockResolvedValue({ code, options: {} });

		const result = await bin(args);

		expect(mockCreate).toHaveBeenCalledWith(args);
		expect(mockCancel).toHaveBeenCalledWith(
			`Operation failed. Exiting - maybe another time? 👋`,
		);
		expect(result).toEqual(code);
	});
});
