import chalk from "chalk";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { clearUnnecessaryFiles } from "./clearUnnecessaryFiles.js";

const mockExecaCommand = vi.fn().mockRejectedValue("Oh no!");

vi.mock("execa", () => ({
	get execaCommand() {
		return mockExecaCommand;
	},
}));

describe("clearUnnecessaryFiles", () => {
	beforeEach(() => {
		console.log = vi.fn();
	});

	it("runs all commands even when they fail", async () => {
		await clearUnnecessaryFiles();

		expect(console.log).toHaveBeenCalledWith(
			chalk.gray(`rm -rf ./src/**/*.js`)
		);
		expect(mockExecaCommand).toHaveBeenCalledWith(`rm -rf ./src/**/*.js`);
	});
});
