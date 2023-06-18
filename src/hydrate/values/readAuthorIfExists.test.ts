import { describe, expect, it, vi } from "vitest";

import { readAuthorIfExists } from "./readAuthorIfExists.js";

const mockGetNpmAuthor = vi.fn();

vi.mock("../../shared/getNpmAuthor.js", () => ({
	get getNpmAuthor() {
		return mockGetNpmAuthor;
	},
}));

const npmAuthorMockResult = "Someone from NPM <someone@npm.com>";

describe("readAuthorIfExists", () => {
	it('reads author as a string from the existing package "author" field when it exists', async () => {
		mockGetNpmAuthor.mockResolvedValue(npmAuthorMockResult);
		const author = await readAuthorIfExists({
			author: "John Doe <someone@example.com>",
		});
		expect(author).not.toBe(npmAuthorMockResult);
		expect(author).not.toContain(" <someone@example.com>");
		expect(author).toBe("John Doe");
	});

	it('reads author as an object from the existing package "author" field when it exists', async () => {
		mockGetNpmAuthor.mockResolvedValue(npmAuthorMockResult);
		const author = await readAuthorIfExists({
			author: { email: "someone@example.com", name: "John Doe" },
		});
		expect(author).not.toBe(npmAuthorMockResult);
		expect(author).toBe("John Doe");
	});

	it("reads author from getNpmAuthor when author is missing from package", async () => {
		mockGetNpmAuthor.mockResolvedValue(npmAuthorMockResult);
		const author = await readAuthorIfExists({});
		expect(author).toBe(npmAuthorMockResult);
	});
});
