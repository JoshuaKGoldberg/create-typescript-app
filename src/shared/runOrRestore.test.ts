import { beforeEach, describe, expect, it, SpyInstance, vi } from "vitest";

import { runOrRestore } from "./runOrRestore.js";

vi.mock("@clack/prompts", () => ({
	intro: vi.fn(),
	outro: vi.fn(),
}));

vi.mock("./inputs.js", () => ({
	getInputValuesAndOctokit: vi.fn().mockResolvedValue({
		octokit: undefined,
		values: {
			skipRestore: true,
		},
	}),
}));

let mockConsoleLog: SpyInstance;

describe("runOrRestore", () => {
	beforeEach(() => {
		mockConsoleLog = vi
			.spyOn(console, "log")
			.mockImplementation(() => undefined);

		vi.spyOn(console, "clear").mockImplementation(() => undefined);
	});

	it("returns 0 when run resolves", async () => {
		const actual = await runOrRestore({
			args: [],
			label: "testing",
			run: vi.fn(),
		});

		expect(actual).toEqual(0);
	});

	it("returns 1 when run rejects", async () => {
		const actual = await runOrRestore({
			args: [],
			label: "testing",
			run: vi.fn().mockRejectedValue(new Error("Oh no!")),
		});

		expect(actual).toEqual(1);
	});
});
