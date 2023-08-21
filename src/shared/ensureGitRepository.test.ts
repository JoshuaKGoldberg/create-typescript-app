import chalk from "chalk";
import { describe, expect, it, vi } from "vitest";

import { ensureGitRepository } from "./ensureGitRepository.js";

const mock$ = vi.fn();

vi.mock("execa", () => ({
	get $() {
		return mock$;
	},
}));

const mockLogLine = vi.fn();

vi.mock("./cli/lines.js", () => ({
	get logLine() {
		return mockLogLine;
	},
}));

describe("ensureGitRepository", () => {
	it("does not run git init when git status succeeds", async () => {
		mock$.mockResolvedValue(0);

		await ensureGitRepository();

		expect(mock$).toHaveBeenCalledTimes(1);
		expect(mockLogLine).not.toHaveBeenCalled();
	});

	it("runs git init when git status fails", async () => {
		mock$.mockRejectedValueOnce(1);

		await ensureGitRepository();

		expect(mock$).toHaveBeenCalledWith(["git init"]);
		expect(mockLogLine).toHaveBeenCalledWith();
		expect(mockLogLine).toHaveBeenCalledWith(
			chalk.gray("Running `git init` to turn this into a Git repository."),
		);
	});
});
