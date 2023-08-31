import { describe, expect, it, vi } from "vitest";

import { initializeRepositoryLabels } from "./initializeRepositoryLabels.js";

const mock$ = vi.fn();

vi.mock("execa", () => ({
	get $() {
		return mock$;
	},
}));

const mockOutcomeLabel = {
	color: "000000",
	description: "def ghi",
	name: "abc",
};

vi.mock("./outcomeLabels.js", () => ({
	get outcomeLabels() {
		return [mockOutcomeLabel];
	},
}));

describe("migrateRepositoryLabels", () => {
	it("creates a outcome label when labels stdout is returned", async () => {
		mock$.mockResolvedValue({
			stdout: "",
		});

		await initializeRepositoryLabels();

		expect(mock$.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    [
			      "gh label list --json color,description,name",
			    ],
			  ],
			  [
			    [
			      "gh label create ",
			      " --color ",
			      " --description ",
			      "",
			    ],
			    "abc",
			    "000000",
			    "def ghi",
			  ],
			]
		`);
	});

	it("creates a outcome label when it doesn't already exist", async () => {
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

		expect(mock$.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    [
			      "gh label list --json color,description,name",
			    ],
			  ],
			  [
			    [
			      "gh label create ",
			      " --color ",
			      " --description ",
			      "",
			    ],
			    "abc",
			    "000000",
			    "def ghi",
			  ],
			]
		`);
	});

	it("doesn't edit a outcome label when it already exists with the same information", async () => {
		mock$.mockResolvedValue({
			stdout: JSON.stringify([mockOutcomeLabel]),
		});

		await initializeRepositoryLabels();

		expect(mock$.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    [
			      "gh label list --json color,description,name",
			    ],
			  ],
			]
		`);
	});

	it("edits a outcome label when it already exists with different color", async () => {
		mock$.mockResolvedValue({
			stdout: JSON.stringify([
				{
					...mockOutcomeLabel,
					color: "111111",
				},
			]),
		});

		await initializeRepositoryLabels();

		expect(mock$.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    [
			      "gh label list --json color,description,name",
			    ],
			  ],
			  [
			    [
			      "gh label edit ",
			      " --color ",
			      " --description ",
			      " --name ",
			      "",
			    ],
			    "abc",
			    "000000",
			    "def ghi",
			    "abc",
			  ],
			]
		`);
	});

	it("edits a outcome label when it already exists with different description", async () => {
		mock$.mockResolvedValue({
			stdout: JSON.stringify([
				{
					...mockOutcomeLabel,
					description: "updated",
				},
			]),
		});

		await initializeRepositoryLabels();

		expect(mock$.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    [
			      "gh label list --json color,description,name",
			    ],
			  ],
			  [
			    [
			      "gh label edit ",
			      " --color ",
			      " --description ",
			      " --name ",
			      "",
			    ],
			    "abc",
			    "000000",
			    "def ghi",
			    "abc",
			  ],
			]
		`);
	});

	it("deletes an existing non-outcome label when the equivalent outcome label already exists", async () => {
		mock$.mockResolvedValue({
			stdout: JSON.stringify([
				{
					color: "000000",
					description: "def ghi",
					name: "abc",
				},
				{
					color: "000000",
					description: "def ghi",
					name: "area: abc",
				},
			]),
		});

		await initializeRepositoryLabels();

		expect(mock$.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    [
			      "gh label list --json color,description,name",
			    ],
			  ],
			]
		`);
	});

	it("deletes a pre-existing label when it isn't a outcome label", async () => {
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

		expect(mock$.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    [
			      "gh label list --json color,description,name",
			    ],
			  ],
			  [
			    [
			      "gh label create ",
			      " --color ",
			      " --description ",
			      "",
			    ],
			    "abc",
			    "000000",
			    "def ghi",
			  ],
			]
		`);
	});

	it("doesn't delete a pre-existing label when it isn't a outcome label", async () => {
		mock$.mockResolvedValue({
			stdout: JSON.stringify([
				{
					color: "000000",
					description: "def ghi",
					name: "jkl",
				},
			]),
		});

		await initializeRepositoryLabels();

		expect(mock$.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    [
			      "gh label list --json color,description,name",
			    ],
			  ],
			  [
			    [
			      "gh label create ",
			      " --color ",
			      " --description ",
			      "",
			    ],
			    "abc",
			    "000000",
			    "def ghi",
			  ],
			]
		`);
	});
});
