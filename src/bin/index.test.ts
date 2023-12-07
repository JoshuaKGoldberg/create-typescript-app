import chalk from "chalk";
import { beforeEach, describe, expect, it, vi } from "vitest";
import z from "zod";

import { bin } from "./index.js";
import { getVersionFromPackageJson } from "./packageJson.js";

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

vi.mock("./promptForMode.js", () => ({
	get promptForMode() {
		return mockPromptForMode;
	},
}));

describe("bin", () => {
	beforeEach(() => {
		vi.spyOn(console, "clear").mockImplementation(() => undefined);
		vi.spyOn(console, "log").mockImplementation(() => undefined);
	});

	it("returns 1 when promptForMode returns an undefined mode", async () => {
		mockPromptForMode.mockResolvedValue({});

		const result = await bin([]);

		expect(mockOutro).toHaveBeenCalledWith(
			chalk.red("Operation cancelled. Exiting - maybe another time? 👋"),
		);
		expect(result).toBe(1);
	});

	it("returns 1 when promptForMode returns an error mode", async () => {
		const error = new Error("Oh no!");
		mockPromptForMode.mockResolvedValue({ mode: error });

		const result = await bin([]);

		expect(mockOutro).toHaveBeenCalledWith(chalk.red(error.message));
		expect(result).toBe(1);
	});

	it("returns the success result of the corresponding runner without cancel logging when promptForMode returns a mode that succeeds", async () => {
		const mode = "create";
		const args = ["--owner", "abc123"];
		const code = 0;
		const promptedOptions = { directory: "." };

		mockPromptForMode.mockResolvedValue({ mode, options: promptedOptions });
		mockCreate.mockResolvedValue({ code, options: {} });

		const result = await bin(args);

		expect(mockCreate).toHaveBeenCalledWith(args, promptedOptions);
		expect(mockCancel).not.toHaveBeenCalled();
		expect(mockInitialize).not.toHaveBeenCalled();
		expect(mockMigrate).not.toHaveBeenCalled();
		expect(result).toEqual(code);
	});

	it("returns the cancel result of the corresponding runner and cancel logs when promptForMode returns a mode that cancels", async () => {
		const mode = "create";
		const args = ["--owner", "abc123"];
		const code = 2;
		const promptedOptions = { directory: "." };

		mockPromptForMode.mockResolvedValue({ mode, options: promptedOptions });
		mockCreate.mockResolvedValue({ code, options: {} });

		const result = await bin(args);

		expect(mockCreate).toHaveBeenCalledWith(args, promptedOptions);
		expect(mockCancel).toHaveBeenCalledWith(
			`Operation cancelled. Exiting - maybe another time? 👋`,
		);
		expect(result).toEqual(code);
	});

	it("returns the cancel result containing a zod error of the corresponding runner and output plus cancel logs when promptForMode returns a mode that cancels with a string error", async () => {
		const mode = "initialize";
		const args = ["--email", "abc123"];
		const code = 2;
		const error = "Oh no!";

		mockPromptForMode.mockResolvedValue({ mode });
		mockInitialize.mockResolvedValue({
			code: 2,
			error,
			options: {},
		});

		const result = await bin(args);

		expect(mockInitialize).toHaveBeenCalledWith(args, undefined);
		expect(mockLogLine).toHaveBeenCalledWith(chalk.red(error));
		expect(mockCancel).toHaveBeenCalledWith(
			`Operation cancelled. Exiting - maybe another time? 👋`,
		);
		expect(result).toEqual(code);
	});

	it("returns the cancel result containing a zod error of the corresponding runner and output plus cancel logs when promptForMode returns a mode that cancels with a zod error", async () => {
		const mode = "initialize";
		const args = ["--email", "abc123"];
		const code = 2;

		const validationResult = z
			.object({ email: z.string().email() })
			.safeParse({ email: "abc123" });

		mockPromptForMode.mockResolvedValue({ mode });
		mockInitialize.mockResolvedValue({
			code: 2,
			error: (validationResult as z.SafeParseError<{ email: string }>).error,
			options: {},
		});

		const result = await bin(args);

		expect(mockInitialize).toHaveBeenCalledWith(args, undefined);
		expect(mockLogLine).toHaveBeenCalledWith(
			chalk.red('Validation error: Invalid email at "email"'),
		);
		expect(mockCancel).toHaveBeenCalledWith(
			`Operation cancelled. Exiting - maybe another time? 👋`,
		);
		expect(result).toEqual(code);
	});

	it("returns the cancel result of the corresponding runner and cancel logs when promptForMode returns a mode that fails", async () => {
		const mode = "create";
		const args = ["--owner", "abc123"];
		const code = 1;
		const promptedOptions = { directory: "." };

		mockPromptForMode.mockResolvedValue({ mode, options: promptedOptions });
		mockCreate.mockResolvedValue({ code, options: {} });

		const result = await bin(args);

		expect(mockCreate).toHaveBeenCalledWith(args, promptedOptions);
		expect(mockCancel).toHaveBeenCalledWith(
			`Operation failed. Exiting - maybe another time? 👋`,
		);
		expect(result).toEqual(code);
	});

	it("prints the version when the --version flag is passed", async () => {
		const args = ["--version"];
		const version = await getVersionFromPackageJson();

		const result = await bin(args);

		expect(console.log).toHaveBeenCalledWith(version);
		expect(result).toBe(0);
	});
});
