import chalk from "chalk";
import { SpyInstance, beforeEach, describe, expect, it, vi } from "vitest";

import { outro } from "./outro.js";

const mockOutro = vi.fn();

vi.mock("@clack/prompts", () => ({
	get outro() {
		return mockOutro;
	},
}));

let mockConsoleLog: SpyInstance;

describe("outro", () => {
	beforeEach(() => {
		mockConsoleLog = vi
			.spyOn(console, "log")
			.mockImplementation(() => undefined);
	});

	it("logs only basic statements when no lines are provided", () => {
		outro([{ label: "Abc 123" }]);

		expect(mockConsoleLog.mock.calls).toEqual([
			[chalk.blue("Abc 123")],
			[],
			[chalk.greenBright(`See ya! 👋`)],
			[],
		]);
	});

	it("also logs lines when provided", () => {
		outro([{ label: "Abc 123", lines: ["one", "two"] }]);

		expect(mockConsoleLog.mock.calls).toEqual([
			[chalk.blue("Abc 123")],
			[],
			[chalk.gray("one")],
			[chalk.gray("two")],
			[],
			[chalk.greenBright(`See ya! 👋`)],
			[],
		]);
	});
});
