import { beforeEach, describe, expect, it, vi } from "vitest";

import { runOrRestore } from "./runOrRestore.js";

const mockConfirm = vi.fn();

vi.mock("@clack/prompts", () => ({
	get confirm() {
		return mockConfirm;
	},
	intro: vi.fn(),
	isCancel: vi.fn(),
	outro: vi.fn(),
}));

const mock$ = vi.fn();

vi.mock("execa", () => ({
	get $() {
		return mock$;
	},
}));

const mockGetInputValuesAndOctokit = vi.fn();

vi.mock("./inputs.js", () => ({
	get getInputValuesAndOctokit() {
		return mockGetInputValuesAndOctokit;
	},
}));

describe("runOrRestore", () => {
	beforeEach(() => {
		vi.spyOn(console, "clear").mockImplementation(() => undefined);
		vi.spyOn(console, "log").mockImplementation(() => undefined);
	});

	it("returns 0 when run resolves", async () => {
		mockGetInputValuesAndOctokit.mockResolvedValue({
			octokit: undefined,
			values: {},
		});

		const actual = await runOrRestore({
			args: [],
			label: "testing",
			run: vi.fn(),
		});

		expect(actual).toEqual(0);
	});

	it("returns 1 and does not restore the repository when run rejects, skipRestore is false, and shouldRestore is not confirmed", async () => {
		mockGetInputValuesAndOctokit.mockResolvedValue({
			octokit: undefined,
			values: {
				skipRestore: false,
			},
		});
		mockConfirm.mockResolvedValue(false);

		const actual = await runOrRestore({
			args: [],
			label: "testing",
			run: vi.fn().mockRejectedValue(new Error("Oh no!")),
		});

		expect(actual).toEqual(1);

		expect(mock$).not.toHaveBeenCalled();
	});

	it("returns 1 and restores the repository when run rejects, skipRestore is false, and shouldRestore is confirmed", async () => {
		mockGetInputValuesAndOctokit.mockResolvedValue({
			octokit: undefined,
			values: {
				skipRestore: false,
			},
		});
		mockConfirm.mockResolvedValue(true);

		const actual = await runOrRestore({
			args: [],
			label: "testing",
			run: vi.fn().mockRejectedValue(new Error("Oh no!")),
		});

		expect(actual).toEqual(1);

		expect(mock$).toHaveBeenCalledWith(["git restore ."]);
	});
});
