import { describe, expect, it, vi } from "vitest";

import { readEmailIfExists } from "./readEmailIfExists.js";

const validAuthorPackage = {
	author: "Author<author@package.com>",
	email: "author@package.com",
};

const validEmailPackage = {
	author: { email: "info@package.com", name: "Author" },
};

const mock$ = vi.fn();

vi.mock("execa", () => ({
	get $() {
		return mock$;
	},
}));

const mockGetNpmUserInfo = vi.fn();

vi.mock("../../shared/getNpmUserInfo.js", () => ({
	get getNpmUserInfo() {
		return mockGetNpmUserInfo;
	},
}));

describe("readEmailIfExists", () => {
	it('Reads email from the package "author" field', async () => {
		const email = await readEmailIfExists(validAuthorPackage);

		expect(email).toBe("author@package.com");
	});

	it("Reads email from the package email field if author is missing", async () => {
		const email = await readEmailIfExists(validEmailPackage);

		expect(email).toBe("info@package.com");
	});

	it("Reads email from the email field if author is missing", async () => {
		const email = await readEmailIfExists(validEmailPackage);

		expect(email).toBe("info@package.com");
	});

	it("Reads email from getNpmUserInfo if available", async () => {
		mockGetNpmUserInfo.mockResolvedValue({
			succeeded: true,
			value: {
				avatar: "",
				email: "info@npm.worked",
				github: "",
				name: "someone",
				twitter: "",
			},
		});

		const email = await readEmailIfExists({});
		expect(email).toBe("info@npm.worked");
	});

	it("Reads email from git config if nothing else worked", async () => {
		mockGetNpmUserInfo.mockResolvedValue({
			reason: "it doesn't matter",
			succeeded: false,
		});
		mock$.mockResolvedValue({ stdout: "info@git.worked" });
		const email = await readEmailIfExists({});

		expect(email).toBe("info@git.worked");
	});

	it("Return undefined if nothing worked", async () => {
		mockGetNpmUserInfo.mockResolvedValue({
			reason: "it doesn't matter",
			succeeded: false,
		});
		mock$.mockRejectedValue("");
		const email = await readEmailIfExists({});

		expect(email).toBe(undefined);
	});
});
