import chalk from "chalk";
import { describe, expect, it, vi } from "vitest";

import { PrefillPrompter } from "./PrefillPrompter.js";

const mockText = vi.fn();

vi.mock("@clack/prompts", () => ({
	isCancel: () => false,
	get text() {
		return mockText;
	},
}));

const mockLogLine = vi.fn();

vi.mock("./cli/lines.js", () => ({
	get logLine() {
		return mockLogLine;
	},
}));

describe("PrefillPrompter", () => {
	it("logs a line and a pre-fill message when a first value already exists", async () => {
		const prompter = new PrefillPrompter();
		const existing = "existing value";

		const actual = await prompter.getPrefillOrPromptedValue(
			"key",
			existing,
			""
		);

		expect(actual).toEqual(existing);
		expect(mockLogLine.mock.calls).toEqual([
			[],
			[chalk.gray(`Pre-filling key to existing value.`)],
		]);
	});

	it("logs only a pre-fill message when a second value already exists", async () => {
		const prompter = new PrefillPrompter();

		await prompter.getPrefillOrPromptedValue("key 1", "existing 1", "");

		const actual = await prompter.getPrefillOrPromptedValue(
			"key 2",
			"existing 2",
			""
		);

		expect(actual).toEqual("existing 2");
		expect(mockLogLine.mock.calls).toEqual([
			[],
			[chalk.gray(`Pre-filling key 1 to existing 1.`)],
			[chalk.gray(`Pre-filling key 2 to existing 2.`)],
		]);
	});

	it("prompts for a new value when the value doesn't already exist", async () => {
		const prompter = new PrefillPrompter();
		const expected = "expected value";

		mockText.mockResolvedValue(expected);

		const actual = await prompter.getPrefillOrPromptedValue(
			"key",
			undefined,
			""
		);

		expect(actual).toEqual(expected);
		expect(mockLogLine).not.toHaveBeenCalled();
	});
});
