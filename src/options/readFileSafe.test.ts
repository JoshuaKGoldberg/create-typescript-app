import { describe, expect, it, vi } from "vitest";

import { readFileSafe } from "./readFileSafe.js";

const mockReadFile = vi.fn();

vi.mock("node:fs/promises", () => ({
	get readFile() {
		return mockReadFile;
	},
}));

describe("readFundingIfExists", () => {
	it("outputs the file content as string when it exists", async () => {
		mockReadFile.mockResolvedValue("File content as string");
		const result = await readFileSafe("/path/to/file.ext", "fallback");
		expect(result).toBe("File content as string");
	});

	it("returns fallback when readFile fails", async () => {
		mockReadFile.mockRejectedValue("Oops");
		const result = await readFileSafe("/path/to/nowhere.ext", "fallback");
		expect(result).toBe("fallback");
	});
});
