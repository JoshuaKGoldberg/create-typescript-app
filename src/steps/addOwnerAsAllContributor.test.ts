import prettier from "prettier";
import { describe, expect, it, vi } from "vitest";

import { addOwnerAsAllContributor } from "./addOwnerAsAllContributor.js";

const mock$ = vi.fn();

vi.mock("execa", () => ({
	get $() {
		return mock$;
	},
}));

const mockWriteFile = vi.fn();

vi.mock("node:fs/promises", () => ({
	get default() {
		return {
			get writeFile() {
				return mockWriteFile;
			},
		};
	},
}));

const mockReadFileAsJson = vi.fn();

vi.mock("../shared/readFileAsJson.js", () => ({
	get readFileAsJson() {
		return mockReadFileAsJson;
	},
}));

const mockOwner = "TestOwner";

vi.mock("../shared/getGitHubUserAsAllContributor", () => ({
	getGitHubUserAsAllContributor: () => mockOwner,
}));

describe("addOwnerAsAllContributor", () => {
	it("throws an error when the .all-contributorsrc fails to read", async () => {
		mock$.mockResolvedValueOnce({
			stdout: JSON.stringify({ login: "user" }),
		});
		mockReadFileAsJson.mockResolvedValue("invalid");

		await expect(async () => {
			await addOwnerAsAllContributor({ owner: mockOwner });
		}).rejects.toMatchInlineSnapshot(
			'[Error: Invalid .all-contributorsrc: "invalid"]',
		);
	});

	it("throws an error when the .all-contributorsrc is missing expected properties", async () => {
		mock$.mockResolvedValueOnce({
			stdout: JSON.stringify({ login: "user" }),
		});
		mockReadFileAsJson.mockResolvedValue({});

		await expect(async () => {
			await addOwnerAsAllContributor({ owner: mockOwner });
		}).rejects.toMatchInlineSnapshot(
			"[Error: Invalid .all-contributorsrc: {}]",
		);
	});

	it("sets the running user to tool when no prior contributions exist", async () => {
		mock$.mockResolvedValueOnce({
			stdout: JSON.stringify({ login: mockOwner }),
		});
		mockReadFileAsJson.mockResolvedValue({
			contributors: [],
		});

		await addOwnerAsAllContributor({ owner: mockOwner });

		expect(mockWriteFile).toHaveBeenCalledWith(
			"./.all-contributorsrc",
			await prettier.format(
				JSON.stringify({
					contributors: [{ contributions: ["tool"], login: mockOwner }],
				}),
				{ parser: "json" },
			),
		);
	});

	it("resets JoshuaKGoldberg to just tool and adds in the running user when both exist", async () => {
		mock$.mockResolvedValueOnce({
			stdout: JSON.stringify({ login: mockOwner }),
		});
		mockReadFileAsJson.mockResolvedValue({
			contributors: [
				{ contributions: ["bug", "fix"], login: mockOwner },
				{ contributions: ["bug", "fix"], login: "JoshuaKGoldberg" },
			],
		});

		await addOwnerAsAllContributor({ owner: mockOwner });

		expect(mockWriteFile).toHaveBeenCalledWith(
			"./.all-contributorsrc",
			await prettier.format(
				JSON.stringify({
					contributors: [
						{ contributions: ["bug", "fix", "tool"], login: mockOwner },
						{ contributions: ["tool"], login: "JoshuaKGoldberg" },
					],
				}),
				{ parser: "json" },
			),
		);
	});
});
