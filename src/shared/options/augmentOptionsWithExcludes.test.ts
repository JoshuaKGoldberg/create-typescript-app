import { describe, expect, it } from "vitest";

import { Options } from "../types.js";
import { augmentOptionsWithExcludes } from "./augmentOptionsWithExcludes.js";

const optionsBase = {
	author: undefined,
	base: undefined,
	createRepository: undefined,
	description: "",
	email: undefined,
	excludeCompliance: undefined,
	excludeContributors: undefined,
	excludeLintJson: undefined,
	excludeLintKnip: undefined,
	excludeLintMd: undefined,
	excludeLintPackageJson: undefined,
	excludeLintPackages: undefined,
	excludeLintPerfectionist: undefined,
	excludeLintSpelling: undefined,
	excludeLintYml: undefined,
	excludeReleases: undefined,
	excludeRenovate: undefined,
	excludeTests: undefined,
	funding: undefined,
	owner: "",
	repository: "",
	skipGitHubApi: false,
	skipInstall: undefined,
	skipRemoval: undefined,
	skipRestore: undefined,
	skipUninstall: undefined,
	title: "",
};

describe("augmentOptionsWithExcludes", () => {
	it("returns options without exclusions and skips prompting when exclusions are provided manually", async () => {
		const options = {
			...optionsBase,
			excludeCompliance: true,
		} satisfies Options;

		const actual = await augmentOptionsWithExcludes(options);

		expect(actual).toBe(options);
	});

	it("uses base without prompting when base is provided manually", async () => {
		const options = {
			...optionsBase,
			base: "everything",
		} satisfies Options;

		const actual = await augmentOptionsWithExcludes(options);

		expect(actual).toBe(options);
	});
});
