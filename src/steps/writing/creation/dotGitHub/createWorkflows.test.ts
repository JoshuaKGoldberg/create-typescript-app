import { describe, expect, it } from "vitest";

import { Options } from "../../../../shared/types.js";
import { createWorkflows } from "./createWorkflows.js";

const createOptions = (exclude: boolean) =>
	({
		access: "public",
		base: "everything",
		bin: exclude ? undefined : "./bin/index.js",
		description: "Test description.",
		directory: ".",
		email: {
			github: "github@email.com",
			npm: "npm@email.com",
		},
		excludeAllContributors: exclude,
		excludeCompliance: exclude,
		excludeLintJson: exclude,
		excludeLintKnip: exclude,
		excludeLintMd: exclude,
		excludeLintPackageJson: exclude,
		excludeLintPackages: exclude,
		excludeLintPerfectionist: exclude,
		excludeLintSpelling: exclude,
		excludeLintYml: exclude,
		excludeReleases: exclude,
		excludeRenovate: exclude,
		excludeTests: exclude,
		mode: "create",
		owner: "StubOwner",
		repository: "stub-repository",
		title: "Stub Title",
	}) satisfies Options;

describe("createWorkflows", () => {
	it("creates a full set of workflows when all excludes are disabled", () => {
		const workflows = createWorkflows(createOptions(false));

		expect(workflows).toMatchInlineSnapshot(`Promise {}`);
	});

	it("creates a minimal set of workflows when all options are enabled", () => {
		const workflows = createWorkflows(createOptions(true));

		expect(workflows).toMatchInlineSnapshot(`Promise {}`);
	});
});
