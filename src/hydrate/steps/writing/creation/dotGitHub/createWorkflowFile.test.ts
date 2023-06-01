import { describe, expect, it } from "vitest";

import { createWorkflowFile } from "./createWorkflowFile.js";

describe("createWorkflowFile", () => {
	it("creates a workflow file when runs are provided", () => {
		const actual = createWorkflowFile({
			name: "Test Name",
			runs: ["pnpm build"],
		});

		expect(actual).toEqual(
			`jobs:
  test_name:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: ./.github/actions/prepare
      - run: pnpm build

name: Test Name

on:
  pull_request: ~
  push:
    branches:
      - main
`
		);
	});
});
