import { TextOptions } from "@clack/prompts";
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
	it("provides no placeholder when one is not provided", async () => {
		const message = "Test message";

		await getPrefillOrPromptedOption(message);

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
			message,
			vi.fn().mockResolvedValue(placeholder),
		);

		expect(mockText).toHaveBeenCalledWith({
			message,
			placeholder,
			validate: expect.any(Function),
		});
	});

	it("validates entered text when it's not  blank", async () => {
		const message = "Test message";

		await getPrefillOrPromptedOption(message);

		const { validate } = (mockText.mock.calls[0] as [Required<TextOptions>])[0];

		expect(validate(message)).toBeUndefined();
	});

	it("invalidates entered text when it's blank", async () => {
		const message = "";

		await getPrefillOrPromptedOption(message);

		const { validate } = (mockText.mock.calls[0] as [Required<TextOptions>])[0];

		expect(validate(message)).toBe("Please enter a value.");
	});
});
