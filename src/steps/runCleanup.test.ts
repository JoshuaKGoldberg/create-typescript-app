import chalk from "chalk";
import { describe, expect, it, vi } from "vitest";

import { runCleanup } from "./runCleanup.js";

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

describe("runCleanup", () => {
	it("does not log when the commands all succeed", async () => {
		mockExecaCommand.mockResolvedValue(undefined);

		await runCleanup(["first", "second"], "create");

		expect(mockLogLine).not.toHaveBeenCalled();
	});

	it("logs once when one command fails", async () => {
		mockExecaCommand
			.mockRejectedValueOnce(new Error("Oh no!"))
			.mockResolvedValue(undefined);

		await runCleanup(["first", "second"], "create");

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

		await runCleanup(["first", "second"], "create");

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
