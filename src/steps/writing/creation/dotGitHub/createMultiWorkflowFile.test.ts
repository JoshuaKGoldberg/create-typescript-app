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

		expect(actual).toMatchInlineSnapshot(`Promise {}`);
	});
});
