import chalk from "chalk";
import prettier from "prettier";
import { SpyInstance, beforeEach, describe, expect, it, vi } from "vitest";

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

let mockConsoleWarn: SpyInstance;

describe("addOwnerAsAllContributor", () => {
	beforeEach(() => {
		mockConsoleWarn = vi
			.spyOn(console, "warn")
			.mockImplementation(() => undefined);
	});

	it("throws an error when the .all-contributorsrc fails to read", async () => {
		mock$.mockResolvedValueOnce({
			stdout: JSON.stringify({ login: "user" }),
		});
		mockReadFileAsJson.mockResolvedValue("invalid");

		await expect(async () => {
			await addOwnerAsAllContributor("owner");
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
			await addOwnerAsAllContributor("owner");
		}).rejects.toMatchInlineSnapshot(
			"[Error: Invalid .all-contributorsrc: {}]",
		);
	});

	it("adds in the user from gh api user when it succeeds and contributors is empty", async () => {
		const login = "gh-api-user";

		mock$.mockResolvedValueOnce({
			stdout: JSON.stringify({ login }),
		});
		mockReadFileAsJson.mockResolvedValue({ contributors: [] });

		await addOwnerAsAllContributor("owner");

		expect(mockWriteFile).toHaveBeenCalledWith(
			"./.all-contributorsrc",
			await prettier.format(
				JSON.stringify({
					contributors: [{ contributions: ["tool"], login }],
				}),
				{ parser: "json" },
			),
		);
	});

	it("adds in the provided owner when gh api user fails and contributors is empty", async () => {
		const owner = "owner";

		mock$.mockRejectedValueOnce({});
		mockReadFileAsJson.mockResolvedValue({ contributors: [] });

		await addOwnerAsAllContributor(owner);

		expect(mockWriteFile).toHaveBeenCalledWith(
			"./.all-contributorsrc",
			await prettier.format(
				JSON.stringify({
					contributors: [{ contributions: ["tool"], login: owner }],
				}),
				{ parser: "json" },
			),
		);
		expect(mockConsoleWarn).toHaveBeenCalledWith(
			chalk.gray(
				`Couldn't authenticate GitHub user, falling back to the provided owner name '${owner}'.`,
			),
		);
	});

	it("resets JoshuaKGoldberg to just tool and adds in the running user when both exist", async () => {
		const login = "gh-api-user";

		mock$.mockResolvedValueOnce({
			stdout: JSON.stringify({ login }),
		});
		mockReadFileAsJson.mockResolvedValue({
			contributors: [
				{ contributions: ["bug", "fix"], login },
				{ contributions: ["bug", "fix"], login: "JoshuaKGoldberg" },
			],
		});

		await addOwnerAsAllContributor("owner");

		expect(mockWriteFile).toHaveBeenCalledWith(
			"./.all-contributorsrc",
			await prettier.format(
				JSON.stringify({
					contributors: [
						{ contributions: ["bug", "fix"], login },
						{ contributions: ["tool"], login: "JoshuaKGoldberg" },
					],
				}),
				{ parser: "json" },
			),
		);
	});
});
