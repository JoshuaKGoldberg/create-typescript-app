import chalk from "chalk";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { bin } from "./index.js";

const mockOutro = vi.fn();

vi.mock("@clack/prompts", () => ({
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

		expect(mockOutro.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "[31mOperation cancelled. Exiting - maybe another time? 👋[39m",
			  ],
			]
		`);
		expect(result).toEqual(1);
	});

	it("returns 1 when promptForMode returns an error", async () => {
		const error = new Error("Oh no!");
		mockPromptForMode.mockResolvedValue(error);

		const result = await bin([]);

		expect(mockOutro.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "[31mOh no![39m",
			  ],
			]
		`);
		expect(result).toEqual(1);
	});

	it("returns the result of a runner promptForMode returns a mode", async () => {
		const mode = "create";
		const args = ["--owner", "abc123"];
		const code = 0;

		mockPromptForMode.mockResolvedValue(mode);
		mockCreate.mockResolvedValue({ code, options: {} });

		const result = await bin(args);

		expect(mockCreate).toHaveBeenCalledWith(args);
		expect(mockInitialize).not.toHaveBeenCalled();
		expect(mockMigrate).not.toHaveBeenCalled();
		expect(result).toEqual(code);
	});
});
