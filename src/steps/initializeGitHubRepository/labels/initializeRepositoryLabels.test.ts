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
	name: "area: abc",
};

vi.mock("./outcomeLabels.js", () => ({
	get outcomeLabels() {
		return [mockOutcomeLabel];
	},
}));

describe("migrateRepositoryLabels", () => {
	it("creates an outcome label when labels stdout is empty", async () => {
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
			    "area: abc",
			    "000000",
			    "def ghi",
			  ],
			]
		`);
	});

	it("creates an outcome label when it doesn't already exist", async () => {
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
			    "area: abc",
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

	it("edits the outcome label when it already exists with different color", async () => {
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
			    "area: abc",
			    "000000",
			    "def ghi",
			    "area: abc",
			  ],
			]
		`);
	});

	it("edits the outcome label when it already exists with a different description", async () => {
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
			    "area: abc",
			    "000000",
			    "def ghi",
			    "area: abc",
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
					name: "area: abc",
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
			    "area: abc",
			    "000000",
			    "def ghi",
			  ],
			]
		`);
	});

	it("deletes the existing duplicate outcome label and edits the label with the outcome name and different color when both exist", async () => {
		mock$.mockResolvedValue({
			stdout: JSON.stringify([
				{
					color: "000000",
					description: "def ghi",
					name: "abc",
				},
				{
					color: "111111",
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
			  [
			    [
			      "gh label delete ",
			      " --yes",
			    ],
			    "abc",
			  ],
			  [
			    [
			      "gh label edit ",
			      " --color ",
			      " --description ",
			      " --name ",
			      "",
			    ],
			    "area: abc",
			    "000000",
			    "def ghi",
			    "area: abc",
			  ],
			]
		`);
	});

	it("deletes the existing duplicate outcome label and does not edit the label with the outcome name and same information when both exist", async () => {
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
			  [
			    [
			      "gh label delete ",
			      " --yes",
			    ],
			    "abc",
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
			    "area: abc",
			    "000000",
			    "def ghi",
			  ],
			]
		`);
	});
});
