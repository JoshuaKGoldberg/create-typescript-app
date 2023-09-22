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

	it("provides no placeholder when one is not provided", async () => {
		const message = "Test message";

		await getPrefillOrPromptedOption(undefined, message);

		expect(mockText).toHaveBeenCalledWith({
			message,
			placeholder: undefined,
			validate: expect.any(Function),
		});
	});

	it("provides the placeholder's awaited return when a placeholder function is provided", async () => {
		const message = "Test message";
		const placeholder = "Test placeholder";

		await getPrefillOrPromptedOption(
			undefined,
			message,
			vi.fn().mockResolvedValue(placeholder),
		);

		expect(mockText).toHaveBeenCalledWith({
			message,
			placeholder,
			validate: expect.any(Function),
		});
	});
});
