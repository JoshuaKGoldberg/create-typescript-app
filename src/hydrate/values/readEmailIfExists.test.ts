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
	it('reads email from the package "author" field when it exists', async () => {
		const email = await readEmailIfExists(validAuthorPackage);

		expect(email).toBe("author@package.com");
	});

	it("reads email from the email field in an author object when it exists", async () => {
		const email = await readEmailIfExists(validEmailPackage);

		expect(email).toBe("info@package.com");
	});

	it("reads email from getNpmUserInfo when available and no author information exists", async () => {
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

	it("reads email from git config when it exists and nothing else worked", async () => {
		mockGetNpmUserInfo.mockResolvedValue({
			reason: "it doesn't matter",
			succeeded: false,
		});
		mock$.mockResolvedValue({ stdout: "info@git.worked" });
		const email = await readEmailIfExists({});

		expect(email).toBe("info@git.worked");
	});

	it("return undefined when nothing worked", async () => {
		mockGetNpmUserInfo.mockResolvedValue({
			reason: "it doesn't matter",
			succeeded: false,
		});
		mock$.mockRejectedValue("");
		const email = await readEmailIfExists({});
		expect(email).toBe(undefined);
	});
});
