import { describe, expect, it, vi } from "vitest";

import { clearUnnecessaryFiles } from "./clearUnnecessaryFiles.js";

const mockExecaCommand = vi.fn().mockRejectedValue("Oh no!");

vi.mock("execa", () => ({
	get execaCommand() {
		return mockExecaCommand;
	},
}));

describe("clearUnnecessaryFiles", () => {
	it("runs all commands even when they fail", async () => {
		await clearUnnecessaryFiles();

		expect(mockExecaCommand).toHaveBeenCalledWith(`rm -rf ./src/**/*.js`);
	});
});
