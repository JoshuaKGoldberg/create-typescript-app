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
			author: "Someone <someone@example.com>",
		});
		expect(author).not.toBe(npmAuthorMockResult);
		expect(author).toBe("Someone");
	});

	it('reads author as an object from the existing package "author" field when it exists', async () => {
		mockGetNpmAuthor.mockResolvedValue(npmAuthorMockResult);
		const author = await readAuthorIfExists({
			author: { email: "someone@example.com", name: "Someone" },
		});
		expect(author).not.toBe(npmAuthorMockResult);
		expect(author).toBe("Someone");
	});

	it("reads missing author from getNpmAuthor when exists", async () => {
		mockGetNpmAuthor.mockResolvedValue(npmAuthorMockResult);
		const author = await readAuthorIfExists({});
		expect(author).toBe(npmAuthorMockResult);
	});
});
