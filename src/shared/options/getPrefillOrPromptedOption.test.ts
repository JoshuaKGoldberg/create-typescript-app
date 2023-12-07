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
	it("returns the placeholder when auto is true and it exists", async () => {
		const value = "Test Value";

		const actual = await getPrefillOrPromptedOption({
			auto: true,
			getDefaultValue: vi.fn().mockResolvedValue(value),
			message: "Input message.",
			name: "field",
		});

		expect(actual).toEqual({ error: undefined, value });
	});

	it("returns an error when auto is true and no placeholder exists", async () => {
		const actual = await getPrefillOrPromptedOption({
			auto: true,
			getDefaultValue: vi.fn().mockResolvedValue(undefined),
			message: "Input message.",
			name: "field",
		});

		expect(actual).toEqual({
			error: "Could not infer a default value for field.",
			value: undefined,
		});
	});

	it("provides no placeholder when one is not provided and auto is false", async () => {
		const message = "Test message";

		await getPrefillOrPromptedOption({ auto: false, message, name: "field" });

		expect(mockText).toHaveBeenCalledWith({
			message,
			placeholder: undefined,
			validate: expect.any(Function),
		});
	});

	it("provides the placeholder's awaited return when a placeholder function is provided and auto is false", async () => {
		const message = "Test message";
		const placeholder = "Test placeholder";

		const actual = await getPrefillOrPromptedOption({
			auto: false,
			getDefaultValue: vi.fn().mockResolvedValue(placeholder),
			message,
			name: "field",
		});

		expect(actual).toEqual({
			error: undefined,
			value: placeholder,
		});
		expect(mockText).not.toHaveBeenCalled();
	});

	it("validates entered text when it's not  blank and auto is false", async () => {
		const message = "Test message";

		await getPrefillOrPromptedOption({ auto: false, message, name: "field" });

		const { validate } = (mockText.mock.calls[0] as [Required<TextOptions>])[0];

		expect(validate(message)).toBeUndefined();
	});

	it("invalidates entered text when it's blank and auto is false", async () => {
		const message = "";

		await getPrefillOrPromptedOption({ auto: false, message, name: "field" });

		const { validate } = (mockText.mock.calls[0] as [Required<TextOptions>])[0];

		expect(validate(message)).toBe("Please enter a value.");
	});
});
