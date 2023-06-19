import { describe, expect, it, vi } from "vitest";

import { readFundingIfExists } from "./readFundingIfExists.js";

const mockReadFile = vi.fn();

vi.mock("node:fs/promises", () => ({
	get default() {
		return {
			get readFile() {
				return mockReadFile;
			},
		};
	},
}));

describe("readFundingIfExists", () => {
	it("reads funding from .github/FUNDING.yml when it exists", async () => {
		mockReadFile.mockResolvedValue("github: Contributor");
		const result = await readFundingIfExists();
		expect(result).toBe("Contributor");
	});

	it("returns undefined when funding does not exists", async () => {
		mockReadFile.mockRejectedValue("Oops");
		const result = await readFundingIfExists();
		expect(result).toBe(undefined);
	});
});
