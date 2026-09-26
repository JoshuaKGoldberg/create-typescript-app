import { createMockSystems } from "bingo-testers";
import { describe, expect, it, vi } from "vitest";

import { readFunding } from "./readFunding.ts";

const mockInputFromFile = vi.fn();

vi.mock("input-from-file", () => ({
	get inputFromFile() {
		return mockInputFromFile;
	},
}));

const { take } = createMockSystems();

describe(readFunding, () => {
	it("returns undefined when neither FUNDING file can be read", async () => {
		mockInputFromFile
			.mockResolvedValueOnce(new Error("Oh no!"))
			.mockResolvedValueOnce(new Error("Oh no!"));

		const actual = await readFunding(take);

		expect(actual).toBeUndefined();
	});

	it("returns the value from .github/FUNDING.yaml when it can be read", async () => {
		mockInputFromFile.mockResolvedValueOnce("github: abc");

		const actual = await readFunding(take);

		expect(actual).toBe("abc");
		expect(mockInputFromFile).toHaveBeenCalledTimes(1);
	});

	it("returns the value from .github/FUNDING.yml when .github/FUNDING.yaml cannot be read", async () => {
		mockInputFromFile
			.mockResolvedValueOnce(new Error("Oh no!"))
			.mockResolvedValueOnce("github: abc");

		const actual = await readFunding(take);

		expect(actual).toBe("abc");
	});
});
