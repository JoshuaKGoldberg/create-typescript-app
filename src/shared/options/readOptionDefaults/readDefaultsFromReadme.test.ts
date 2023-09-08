import { describe, expect, it, vi } from "vitest";

import { readDefaultsFromReadme } from "./readDefaultsFromReadme.js";

const mockReadFileSafe = vi.fn();

vi.mock("../../readFileSafe.js", () => ({
	get readFileSafe() {
		return mockReadFileSafe;
	},
}));

describe("readDefaultsFromReadme", () => {
	describe("title", () => {
		it('reads title as markdown from "README.md" when it exists', async () => {
			mockReadFileSafe.mockResolvedValue("# My Awesome Package");
			const result = await readDefaultsFromReadme();
			expect(result.title).toBe("My Awesome Package");
		});

		it('reads title as HTML from "README.md" when it exists', async () => {
			mockReadFileSafe.mockResolvedValue(
				'<h1 align="center">My Awesome Package</h1>',
			);
			const result = await readDefaultsFromReadme();
			expect(result.title).toBe("My Awesome Package");
		});

		it("returns undefined when title does not exist", async () => {
			mockReadFileSafe.mockResolvedValue("");
			const result = await readDefaultsFromReadme();
			expect(result.title).toBe(undefined);
		});
	});
});
