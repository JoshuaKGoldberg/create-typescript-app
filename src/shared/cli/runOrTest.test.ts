import { describe, expect, it, vi } from "vitest";

import { runOrSkip } from "./runOrSkip.js";

const mockSkipSpinnerBlock = vi.fn();

const mockWithSpinner = vi.fn();

vi.mock("./spinners.js", () => ({
	get skipSpinnerBlock() {
		return mockSkipSpinnerBlock;
	},
	get withSpinner() {
		return mockWithSpinner;
	},
}));

describe("runOrSkip", () => {
	it("calls skipSpinnerBlock when skip is true", async () => {
		const action = vi.fn();

		await runOrSkip("Label", true, action);

		expect(mockSkipSpinnerBlock).toHaveBeenCalledWith("Skipping label.");
		expect(mockWithSpinner).not.toHaveBeenCalled();
	});

	it("calls action when skip is falsy", async () => {
		const action = vi.fn();

		await runOrSkip("Label", false, action);

		expect(mockSkipSpinnerBlock).not.toHaveBeenCalled();
		expect(mockWithSpinner).toHaveBeenCalled();
	});
});
