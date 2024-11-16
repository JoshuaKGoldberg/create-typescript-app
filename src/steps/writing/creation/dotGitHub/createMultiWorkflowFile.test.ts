import { describe, expect, it } from "vitest";

import { createMultiWorkflowFile } from "./createMultiWorkflowFile.js";

describe("createMultiWorkflowFile", () => {
	it("creates a workflow file when runs are provided", () => {
		const actual = createMultiWorkflowFile({
			jobs: [
				{
					name: "Job A",
					steps: [{ run: "task-a" }],
				},
				{
					name: "Job B",
					steps: [{ uses: "task-b" }],
				},
			],
			name: "Test Name",
		});

		expect(actual).toMatchInlineSnapshot(`
			"jobs:
			  job_a:
			    name: Job A
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions/checkout@v4
			      - uses: ./.github/actions/prepare
			      - run: task-a
			  job_b:
			    name: Job B
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions/checkout@v4
			      - uses: ./.github/actions/prepare
			      - uses: task-b

			name: Test Name

			on:
			  pull_request: ~
			  push:
			    branches:
			      - main
			"
		`);
	});
});
