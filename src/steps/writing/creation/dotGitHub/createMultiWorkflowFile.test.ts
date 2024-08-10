import { describe, expect, it } from "vitest";

import { createMultiWorkflowFile } from "./createMultiWorkflowFile.js";

describe("createMultiWorkflowFile", () => {
	it("creates a workflow file when runs are provided", () => {
		const actual = createMultiWorkflowFile({
			jobs: [
				{
					name: "job_a",
					steps: [{ run: "task-a" }],
				},
				{
					name: "job_b",
					steps: [{ uses: "task-b" }],
				},
			],
			name: "Test Name",
		});

		expect(actual).toMatchInlineSnapshot(`
			"jobs:
			  job_a:
			    runs-on: ubuntu-latest
			    steps:
			      - run:
			          run: task-a
			  job_b:
			    runs-on: ubuntu-latest
			    steps:
			      - run:
			          uses: task-b

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
