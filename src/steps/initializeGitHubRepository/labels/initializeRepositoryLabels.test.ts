import { Octokit } from "octokit";
import { describe, expect, it, MockInstance, vi } from "vitest";

import { GhLabelData } from "./getExistingEquivalentLabels.js";
import { initializeRepositoryLabels } from "./initializeRepositoryLabels.js";

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

const createMockOctokit = (existingLabels: GhLabelData[]) =>
	({
		request: vi.fn().mockResolvedValueOnce({ data: existingLabels }),
	}) as unknown as { request: MockInstance } & Octokit;

const options = {
	owner: "TestOwner",
	repository: "test-repository",
};

describe("migrateRepositoryLabels", () => {
	it("creates an outcome label when there are no existing labels", async () => {
		const octokit = createMockOctokit([]);

		await initializeRepositoryLabels(octokit, options);

		expect(octokit.request.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "GET /repos/{owner}/{repo}/labels",
			    {
			      "headers": {
			        "X-GitHub-Api-Version": "2022-11-28",
			      },
			      "owner": "TestOwner",
			      "repo": "test-repository",
			    },
			  ],
			  [
			    "POST /repos/{owner}/{repo}/labels",
			    {
			      "color": "000000",
			      "description": "def ghi",
			      "headers": {
			        "X-GitHub-Api-Version": "2022-11-28",
			      },
			      "name": "area: abc",
			      "owner": "TestOwner",
			      "repo": "test-repository",
			    },
			  ],
			]
		`);
	});

	it("creates a new outcome label when an existing label doesn't have an equivalent", async () => {
		const octokit = createMockOctokit([
			{
				color: "111111",
				description: "jkl mno",
				name: "other",
			},
		]);

		await initializeRepositoryLabels(octokit, options);

		expect(octokit.request.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "GET /repos/{owner}/{repo}/labels",
			    {
			      "headers": {
			        "X-GitHub-Api-Version": "2022-11-28",
			      },
			      "owner": "TestOwner",
			      "repo": "test-repository",
			    },
			  ],
			  [
			    "POST /repos/{owner}/{repo}/labels",
			    {
			      "color": "000000",
			      "description": "def ghi",
			      "headers": {
			        "X-GitHub-Api-Version": "2022-11-28",
			      },
			      "name": "area: abc",
			      "owner": "TestOwner",
			      "repo": "test-repository",
			    },
			  ],
			]
		`);
	});

	it("doesn't edit a outcome label when it already exists with the same information", async () => {
		const octokit = createMockOctokit([mockOutcomeLabel]);

		await initializeRepositoryLabels(octokit, options);

		expect(octokit.request.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "GET /repos/{owner}/{repo}/labels",
			    {
			      "headers": {
			        "X-GitHub-Api-Version": "2022-11-28",
			      },
			      "owner": "TestOwner",
			      "repo": "test-repository",
			    },
			  ],
			]
		`);
	});

	it("edits the outcome label when it already exists with different color", async () => {
		const octokit = createMockOctokit([
			{
				...mockOutcomeLabel,
				color: "111111",
			},
		]);

		await initializeRepositoryLabels(octokit, options);

		expect(octokit.request.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "GET /repos/{owner}/{repo}/labels",
			    {
			      "headers": {
			        "X-GitHub-Api-Version": "2022-11-28",
			      },
			      "owner": "TestOwner",
			      "repo": "test-repository",
			    },
			  ],
			  [
			    "PATCH /repos/{owner}/{repo}/labels/{name}",
			    {
			      "color": "000000",
			      "description": "def ghi",
			      "headers": {
			        "X-GitHub-Api-Version": "2022-11-28",
			      },
			      "name": "area: abc",
			      "new_name": "area: abc",
			      "owner": "TestOwner",
			      "repo": "test-repository",
			    },
			  ],
			]
		`);
	});

	it("edits the outcome label when it already exists with a different description", async () => {
		const octokit = createMockOctokit([
			{
				...mockOutcomeLabel,
				description: "updated",
			},
		]);

		await initializeRepositoryLabels(octokit, options);

		expect(octokit.request.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "GET /repos/{owner}/{repo}/labels",
			    {
			      "headers": {
			        "X-GitHub-Api-Version": "2022-11-28",
			      },
			      "owner": "TestOwner",
			      "repo": "test-repository",
			    },
			  ],
			  [
			    "PATCH /repos/{owner}/{repo}/labels/{name}",
			    {
			      "color": "000000",
			      "description": "def ghi",
			      "headers": {
			        "X-GitHub-Api-Version": "2022-11-28",
			      },
			      "name": "area: abc",
			      "new_name": "area: abc",
			      "owner": "TestOwner",
			      "repo": "test-repository",
			    },
			  ],
			]
		`);
	});

	it("deletes an existing non-outcome label when the equivalent outcome label already exists", async () => {
		const octokit = createMockOctokit([
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
		]);

		await initializeRepositoryLabels(octokit, options);

		expect(octokit.request.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "GET /repos/{owner}/{repo}/labels",
			    {
			      "headers": {
			        "X-GitHub-Api-Version": "2022-11-28",
			      },
			      "owner": "TestOwner",
			      "repo": "test-repository",
			    },
			  ],
			  [
			    "DELETE /repos/{owner}/{repo}/labels/{name}",
			    {
			      "headers": {
			        "X-GitHub-Api-Version": "2022-11-28",
			      },
			      "name": "abc",
			      "owner": "TestOwner",
			      "repo": "test-repository",
			    },
			  ],
			]
		`);
	});

	it("doesn't delete a pre-existing label when it isn't a outcome label", async () => {
		const octokit = createMockOctokit([
			{
				color: "000000",
				description: "def ghi",
				name: "unknown",
			},
		]);

		await initializeRepositoryLabels(octokit, options);

		expect(octokit.request.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "GET /repos/{owner}/{repo}/labels",
			    {
			      "headers": {
			        "X-GitHub-Api-Version": "2022-11-28",
			      },
			      "owner": "TestOwner",
			      "repo": "test-repository",
			    },
			  ],
			  [
			    "POST /repos/{owner}/{repo}/labels",
			    {
			      "color": "000000",
			      "description": "def ghi",
			      "headers": {
			        "X-GitHub-Api-Version": "2022-11-28",
			      },
			      "name": "area: abc",
			      "owner": "TestOwner",
			      "repo": "test-repository",
			    },
			  ],
			]
		`);
	});

	it("deletes the existing duplicate outcome label and edits the label with the outcome name and different color when both exist", async () => {
		const octokit = createMockOctokit([
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
		]);

		await initializeRepositoryLabels(octokit, options);

		expect(octokit.request.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "GET /repos/{owner}/{repo}/labels",
			    {
			      "headers": {
			        "X-GitHub-Api-Version": "2022-11-28",
			      },
			      "owner": "TestOwner",
			      "repo": "test-repository",
			    },
			  ],
			  [
			    "DELETE /repos/{owner}/{repo}/labels/{name}",
			    {
			      "headers": {
			        "X-GitHub-Api-Version": "2022-11-28",
			      },
			      "name": "abc",
			      "owner": "TestOwner",
			      "repo": "test-repository",
			    },
			  ],
			  [
			    "PATCH /repos/{owner}/{repo}/labels/{name}",
			    {
			      "color": "000000",
			      "description": "def ghi",
			      "headers": {
			        "X-GitHub-Api-Version": "2022-11-28",
			      },
			      "name": "area: abc",
			      "new_name": "area: abc",
			      "owner": "TestOwner",
			      "repo": "test-repository",
			    },
			  ],
			]
		`);
	});

	it("deletes the existing duplicate outcome label and does not edit the label with the outcome name and same information when both exist", async () => {
		const octokit = createMockOctokit([
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
		]);

		await initializeRepositoryLabels(octokit, options);

		expect(octokit.request.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "GET /repos/{owner}/{repo}/labels",
			    {
			      "headers": {
			        "X-GitHub-Api-Version": "2022-11-28",
			      },
			      "owner": "TestOwner",
			      "repo": "test-repository",
			    },
			  ],
			  [
			    "DELETE /repos/{owner}/{repo}/labels/{name}",
			    {
			      "headers": {
			        "X-GitHub-Api-Version": "2022-11-28",
			      },
			      "name": "abc",
			      "owner": "TestOwner",
			      "repo": "test-repository",
			    },
			  ],
			]
		`);
	});
});
