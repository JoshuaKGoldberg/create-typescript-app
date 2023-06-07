import chalk from "chalk";
import { describe, expect, it, vi } from "vitest";

import { runCommand } from "./runCommand.js";

const mockExecaCommand = vi.fn().mockRejectedValue("Oh no!");

vi.mock("execa", () => ({
	get execaCommand() {
		return mockExecaCommand;
	},
}));

const mockLogLine = vi.fn();

vi.mock("../../shared/cli/lines.js", () => ({
	get logLine() {
		return mockLogLine;
	},
}));

vi.mock("../../shared/cli/spinners.js", () => ({
	withSpinner: vi.fn((callback: () => unknown) => callback()),
}));

describe("runCommand", () => {
	it("does not log when the command succeeds", async () => {
		mockExecaCommand.mockResolvedValue(undefined);

		await runCommand("command", "label");

		expect(mockLogLine).not.toHaveBeenCalled();
	});

	it("logs when the command failures", async () => {
		mockExecaCommand.mockRejectedValue(new Error("Oh no!"));

		await runCommand("command", "label");

		expect(mockLogLine).toHaveBeenCalledWith(
			[
				chalk.yellow(`⚠️ Running \``),
				chalk.yellowBright("command"),
				chalk.yellow(`\` failed. You should run it and fix its complaints.`),
			].join("")
		);
	});
});
