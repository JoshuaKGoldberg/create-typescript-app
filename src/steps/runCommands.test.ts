import chalk from "chalk";
import { describe, expect, it, vi } from "vitest";

import { runCommands } from "./runCommands.js";

const mockExecaCommand = vi.fn().mockRejectedValue("Oh no!");

vi.mock("execa", () => ({
	get execaCommand() {
		return mockExecaCommand;
	},
}));

const mockLogLine = vi.fn();

vi.mock("../shared/cli/lines.js", () => ({
	get logLine() {
		return mockLogLine;
	},
}));

vi.mock("../shared/cli/spinners.js", () => ({
	withSpinner: vi.fn((_label: string, callback: () => unknown) => callback()),
}));

describe("runCommands", () => {
	it("does not log when the commands all succeed", async () => {
		mockExecaCommand.mockResolvedValue(undefined);

		await runCommands("label", ["first", "second"]);

		expect(mockLogLine).not.toHaveBeenCalled();
	});

	it("logs once when one command fails", async () => {
		mockExecaCommand
			.mockRejectedValueOnce(new Error("Oh no!"))
			.mockResolvedValue(undefined);

		await runCommands("label", ["first", "second"]);

		expect(mockLogLine).toHaveBeenCalledWith(
			[
				chalk.yellow(`🟡 Running \``),
				chalk.yellowBright("first"),
				chalk.yellow(`\` failed. You should run it and fix its complaints.`),
			].join(""),
		);
	});

	it("logs twice when two commands fail", async () => {
		mockExecaCommand.mockRejectedValue(new Error("Oh no!"));

		await runCommands("label", ["first", "second"]);

		expect(mockLogLine).toHaveBeenCalledWith(
			[
				chalk.yellow(`🟡 Running \``),
				chalk.yellowBright("first"),
				chalk.yellow(`\` failed. You should run it and fix its complaints.`),
			].join(""),
		);
		expect(mockLogLine).toHaveBeenCalledWith(
			[
				chalk.yellow(`🟡 Running \``),
				chalk.yellowBright("second"),
				chalk.yellow(`\` failed. You should run it and fix its complaints.`),
			].join(""),
		);
	});
});
