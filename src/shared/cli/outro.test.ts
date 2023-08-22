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

		expect(mockConsoleLog.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "[34mAbc 123[39m",
			  ],
			  [],
			  [
			    "[92mSee ya! 👋[39m",
			  ],
			  [],
			]
		`);
	});

	it("also logs lines when provided", () => {
		outro([{ label: "Abc 123", lines: ["One", "Two"] }]);

		expect(mockConsoleLog.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "[34mAbc 123[39m",
			  ],
			  [],
			  [
			    "[90meat[39m",
			  ],
			  [
			    "[90meat[39m",
			  ],
			  [],
			  [
			    "[92mSee ya! 👋[39m",
			  ],
			  [],
			]
		`);
	});
});
