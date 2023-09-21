import { describe, expect, it, vi } from "vitest";

import { readDefaultsFromReadme } from "./readDefaultsFromReadme.js";

const mockReadFileSafe = vi.fn();

vi.mock("../../readFileSafe.js", () => ({
	get readFileSafe() {
		return mockReadFileSafe;
	},
}));

describe("readDefaultsFromReadme", () => {
	describe("logo", () => {
		it("defaults to undefined when it cannot be found", async () => {
			mockReadFileSafe.mockResolvedValue("nothing.");

			const logo = await readDefaultsFromReadme().logo();

			expect(logo).toBeUndefined();
		});

		it("parses when found in an unquoted string", async () => {
			mockReadFileSafe.mockResolvedValue("<img src=abc/def.jpg/>");

			const logo = await readDefaultsFromReadme().logo();

			expect(logo).toBe("abc/def.jpg");
		});

		it("parses when found in a single quoted string", async () => {
			mockReadFileSafe.mockResolvedValue("<img src='abc/def.jpg'/>");

			const logo = await readDefaultsFromReadme().logo();

			expect(logo).toBe("abc/def.jpg");
		});

		it("parses when found in a double quoted string", async () => {
			mockReadFileSafe.mockResolvedValue('<img src="abc/def.jpg"/>');

			const logo = await readDefaultsFromReadme().logo();

			expect(logo).toBe("abc/def.jpg");
		});
	});

	describe("title", () => {
		it("defaults to undefined when it cannot be found", async () => {
			mockReadFileSafe.mockResolvedValue("nothing.");

			const title = await readDefaultsFromReadme().title();

			expect(title).toBeUndefined();
		});

		it('reads title as markdown from "README.md" when it exists', async () => {
			mockReadFileSafe.mockResolvedValue("# My Awesome Package");

			const title = await readDefaultsFromReadme().title();

			expect(title).toBe("My Awesome Package");
		});

		it('reads title as HTML from "README.md" when it exists', async () => {
			mockReadFileSafe.mockResolvedValue(
				'<h1 align="center">My Awesome Package</h1>',
			);

			const title = await readDefaultsFromReadme().title();

			expect(title).toBe("My Awesome Package");
		});

		it("returns undefined when title does not exist", async () => {
			mockReadFileSafe.mockResolvedValue("");

			const title = await readDefaultsFromReadme().title();

			expect(title).toBeUndefined();
		});
	});
});
