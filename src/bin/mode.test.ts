import { describe, expect, it, vi } from "vitest";

import { promptForMode } from "./mode.js";

const mockSelect = vi.fn();

vi.mock("@clack/prompts", () => ({
	isCancel: () => false,
	get select() {
		return mockSelect;
	},
}));

describe("promptForMode", () => {
	it("returns an error when the input exists and is not a mode", async () => {
		const mode = await promptForMode("other");

		expect(mode).toMatchInlineSnapshot(
			"[Error: Unknown --mode: other. Allowed modes are: create, initialize, migrate.]",
		);
	});

	it("returns the input when it is a mode", async () => {
		const input = "create";

		const mode = await promptForMode(input);

		expect(mode).toEqual(input);
	});

	it("returns the selection when input is undefined and the user selects it", async () => {
		const mode = "create";
		mockSelect.mockResolvedValue(mode);

		const actual = await promptForMode(undefined);

		expect(actual).toEqual(mode);
	});
});
