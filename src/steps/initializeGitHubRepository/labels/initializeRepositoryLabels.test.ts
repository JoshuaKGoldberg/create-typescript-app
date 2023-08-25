import { describe, expect, it, vi } from "vitest";

import { initializeRepositoryLabels } from "./initializeRepositoryLabels.js";

const mock$ = vi.fn();

vi.mock("execa", () => ({
	get $() {
		return mock$;
	},
}));

vi.mock("./outcomeLabels.js", () => ({
	outcomeLabels: [
		{
			color: "000000",
			description: "def ghi",
			name: "abc",
		},
	],
}));

describe("migrateRepositoryLabels", () => {
	it("creates a setup label when it doesn't already exist", async () => {
		mock$.mockResolvedValue({
			stdout: JSON.stringify([
				{
					color: "000000",
					description: "def ghi",
					name: "other",
				},
			]),
		});

		await initializeRepositoryLabels();

		expect(mock$).toHaveBeenCalledWith(
			["gh label create ", " --color ", " --description ", ""],
			"abc",
			"000000",
			"def ghi",
		);
	});

	it("edits a setup label when it already exists", async () => {
		mock$.mockResolvedValue({
			stdout: JSON.stringify([
				{
					color: "000000",
					description: "def ghi",
					name: "abc",
				},
			]),
		});

		await initializeRepositoryLabels();

		expect(mock$).toHaveBeenCalledWith(
			["gh label edit ", " --color ", " --description ", " --name ", ""],
			"abc",
			"000000",
			"def ghi",
			"abc",
		);
	});

	it("deletes a pre-existing label when it isn't a setup label", async () => {
		mock$.mockResolvedValue({
			stdout: JSON.stringify([
				{
					color: "000000",
					description: "def ghi",
					name: "unknown",
				},
			]),
		});

		await initializeRepositoryLabels();

		expect(mock$).toHaveBeenCalledWith(
			["gh label delete ", " --yes"],
			"unknown",
		);
		expect(mock$).toHaveBeenCalledTimes(3);
	});

	it("doesn't delete a pre-existing label when it isn't a setup label", async () => {
		mock$.mockResolvedValue({
			stdout: JSON.stringify([
				{
					color: "000000",
					description: "def ghi",
					name: "abc",
				},
			]),
		});

		await initializeRepositoryLabels();

		expect(mock$).not.toHaveBeenCalledWith(
			["gh label delete ", " --yes"],
			"abc",
		);
		expect(mock$).toHaveBeenCalledTimes(2);
	});
});
