import { describe, expect, it, vi } from "vitest";

import { getPrefillOrPromptedOption } from "./getPrefillOrPromptedOption.js";

const mockText = vi.fn();

vi.mock("@clack/prompts", () => ({
	isCancel: () => false,
	get text() {
		return mockText;
	},
}));

describe("getPrefillOrPromptedValue", () => {
	it("logs a pre-fill message when a first value already exists", async () => {
		const existing = "existing value";

		const actual = await getPrefillOrPromptedOption(existing, "");

		expect(actual).toEqual(existing);
	});

	it("prompts for a new value when the value doesn't already exist", async () => {
		const expected = "expected value";

		mockText.mockResolvedValue(expected);

		const actual = await getPrefillOrPromptedOption(undefined, "");

		expect(actual).toEqual(expected);
	});
});
