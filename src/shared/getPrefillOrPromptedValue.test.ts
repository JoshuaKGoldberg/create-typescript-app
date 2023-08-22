import { describe, expect, it, vi } from "vitest";

import { getPrefillOrPromptedValue } from "./getPrefillOrPromptedValue.js";

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

		const actual = await getPrefillOrPromptedValue(existing, "");

		expect(actual).toEqual(existing);
	});

	it("prompts for a new value when the value doesn't already exist", async () => {
		const expected = "expected value";

		mockText.mockResolvedValue(expected);

		const actual = await getPrefillOrPromptedValue(undefined, "");

		expect(actual).toEqual(expected);
	});
});
