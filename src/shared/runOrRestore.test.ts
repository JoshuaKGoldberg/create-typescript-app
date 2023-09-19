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
			run: vi.fn(),
			skipRestore: true,
		});

		expect(actual).toBe(0);
	});

	it("returns 2 and does not restore the repository when run rejects and skipRestore is true", async () => {
		mockGetInputValuesAndOctokit.mockResolvedValue({
			octokit: undefined,
			values: {
				skipRestore: false,
			},
		});
		mockConfirm.mockResolvedValue(false);

		const actual = await runOrRestore({
			run: vi.fn().mockRejectedValue(new Error("Oh no!")),
			skipRestore: true,
		});

		expect(actual).toBe(2);
		expect(mock$).toHaveBeenCalledTimes(0);
	});

	it("returns 2 and restores the repository when run rejects and skipRestore is false", async () => {
		mockGetInputValuesAndOctokit.mockResolvedValue({
			octokit: undefined,
			values: {
				skipRestore: false,
			},
		});
		mockConfirm.mockResolvedValue(true);

		const actual = await runOrRestore({
			run: vi.fn().mockRejectedValue(new Error("Oh no!")),
			skipRestore: false,
		});

		expect(actual).toBe(2);
		expect(mock$.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    [
			      "git restore .",
			    ],
			  ],
			]
		`);
	});
});
