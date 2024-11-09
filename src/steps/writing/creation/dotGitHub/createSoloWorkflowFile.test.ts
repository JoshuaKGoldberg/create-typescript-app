import { describe, expect, it } from "vitest";

import { createSoloWorkflowFile } from "./createSoloWorkflowFile.js";

describe("createSoloWorkflowFile", () => {
	it("creates a workflow file when runs are provided", () => {
		const actual = createSoloWorkflowFile({
			name: "Test Name",
			runs: ["pnpm build"],
		});

		expect(actual).toMatchInlineSnapshot(`Promise {}`);
	});
});
