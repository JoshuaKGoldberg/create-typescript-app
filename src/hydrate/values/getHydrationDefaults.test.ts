import { describe, expect, it, vi } from "vitest";

import { getHydrationDefaults } from "./getHydrationDefaults.js";

const mockReadFileSafe = vi.fn();

vi.mock("../readFileSafe.ts", () => ({
	get readFileSafe() {
		return mockReadFileSafe;
	},
}));

const mockReadFundingIfExists = vi.fn();

vi.mock("./readFundingIfExists.ts", () => ({
	get readFundingIfExists() {
		return mockReadFundingIfExists;
	},
}));

const mockReadOwnerFromGitRemote = vi.fn();

vi.mock("./readOwnerFromGitRemote.ts", () => ({
	get readOwnerFromGitRemote() {
		return mockReadOwnerFromGitRemote;
	},
}));

const mockReadTitleFromReadme = vi.fn();

vi.mock("./readTitleFromReadme.ts", () => ({
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
		expect(result).toEqual({
			author: "Someone",
			email: "someone@test.com",
			funding: "Someone",
			owner: "SUM1",
			releases: true,
			title: "My Awesome Package",
			unitTests: true,
		});
	});
});
