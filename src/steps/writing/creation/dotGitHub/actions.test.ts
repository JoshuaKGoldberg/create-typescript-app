import { describe, expect, it } from "vitest";

import { createDotGitHubActions } from "./actions.js";

describe("createDotGitHubActions", () => {
	it("creates a prepare/action.yml file", () => {
		const actual = createDotGitHubActions();

		expect(actual).toEqual({
			prepare: {
				"action.yml": `description: Prepares the repo for a typical CI job

name: Prepare

runs:
  steps:
    - uses: pnpm/action-setup@v4
      with:
        version: 9
    - uses: actions/setup-node@v4
      with:
        cache: pnpm
        node-version: '20'
    - run: pnpm install --frozen-lockfile
      shell: bash
  using: composite
`,
			},
		});
	});
});
