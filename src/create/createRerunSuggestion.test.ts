import { describe, expect, it } from "vitest";

import { createRerunSuggestion } from "./createRerunSuggestion.js";

describe("createRerunSuggestion", () => {
	it("includes key-value pairs with mixed truthy and falsy values", () => {
		const actual = createRerunSuggestion("initialize", {
			author: "TestAuthor",
			base: "everything",
			createRepository: true,
			description: "Test description.",
			email: "test@test.com",
			excludeCompliance: true,
			excludeContributors: true,
			excludeLintJson: true,
			excludeLintKnip: true,
			excludeLintMd: false,
			excludeLintPackageJson: true,
			excludeLintPackages: false,
			excludeLintPerfectionist: true,
			excludeLintSpelling: false,
			excludeLintYml: false,
			excludeReleases: false,
			excludeRenovate: undefined,
			excludeTests: undefined,
			funding: undefined,
			owner: "TestOwner",
			repository: "test-repository",
			skipGitHubApi: true,
			skipInstall: true,
			skipRemoval: true,
			skipRestore: undefined,
			skipUninstall: undefined,
			title: "Test Title",
		});

		expect(actual).toMatchInlineSnapshot(
			'"npx template-typescript-node-package --mode initialize --description \\"Test description.\\" --exclude-compliance true --owner TestOwner --repository test-repository --title \\"Test Title\\""',
		);
	});
});
