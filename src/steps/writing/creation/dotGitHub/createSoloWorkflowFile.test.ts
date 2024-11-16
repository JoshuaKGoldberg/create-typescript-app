import { describe, expect, it } from "vitest";

import { createSoloWorkflowFile } from "./createSoloWorkflowFile.js";

describe("createSoloWorkflowFile", () => {
	it("creates a workflow file when runs are provided", () => {
		const actual = createSoloWorkflowFile({
			name: "Test Name",
			runs: ["pnpm build"],
		});

		expect(actual).toMatchInlineSnapshot(`
			"jobs:
			  test_name:
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions/checkout@v4
			      - uses: ./.github/actions/prepare
			      - run: pnpm build

			name: Test Name
			"
		`);
	});
});
