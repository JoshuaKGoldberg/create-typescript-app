import { describe, expect, it, vi } from "vitest";

import { getHydrationDefaults } from "./getHydrationDefaults.js";

const mockReadFileSafe = vi.fn();

vi.mock("../readFileSafe.js", () => ({
	get readFileSafe() {
		return mockReadFileSafe;
	},
}));

const mockReadFundingIfExists = vi.fn();

vi.mock("./readFundingIfExists.js", () => ({
	get readFundingIfExists() {
		return mockReadFundingIfExists;
	},
}));

const mockReadOwnerFromGitRemote = vi.fn();

vi.mock("./readOwnerFromGitRemote.js", () => ({
	get readOwnerFromGitRemote() {
		return mockReadOwnerFromGitRemote;
	},
}));

const mockReadTitleFromReadme = vi.fn();

vi.mock("./readTitleFromReadme.js", () => ({
	get readTitleFromReadme() {
		return mockReadTitleFromReadme;
	},
}));

describe("getHydrationDefaults", () => {
	it("reads hydration defaults from existing readme and package json when exists", async () => {
		mockReadTitleFromReadme.mockResolvedValue("My Awesome Package");
		mockReadFileSafe.mockResolvedValueOnce(
			'{"author":"Someone <someone@test.com>"}'
		);
		mockReadFundingIfExists.mockResolvedValue("Someone");
		mockReadOwnerFromGitRemote.mockResolvedValue("SUM1");

		const result = await getHydrationDefaults();
		expect(await result.author()).toBe("Someone");
		expect(await result.email()).toBe("someone@test.com");
		expect(await result.funding()).toBe("Someone");
		expect(await result.owner()).toBe("SUM1");
		expect(result.releases).toBe(true);
		expect(await result.title()).toBe("My Awesome Package");
		expect(result.unitTests).toBe(true);
	});
});
