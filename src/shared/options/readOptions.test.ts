import { describe, expect, it } from "vitest";

import { readOptions } from "./readOptions.js";

describe("readOptions", () => {
	it("validates unsupported arguments and cancels the function", async () => {
		expect(await readOptions(["--base", "true"])).toStrictEqual({
			cancelled: true,
			options: {
				author: undefined,
				base: undefined,
				createRepository: undefined,
				description: undefined,
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
				owner: undefined,
				repository: undefined,
				skipGitHubApi: false,
				skipInstall: false,
				skipRemoval: false,
				skipRestore: undefined,
				skipUninstall: false,
				title: undefined,
			},
		});
	});
});
