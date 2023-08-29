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
			'"npx create-typescript-app --mode initialize --author TestAuthor --base everything --create-repository true --description \\"Test description.\\" --email test@test.com --exclude-compliance true --exclude-contributors true --exclude-lint-json true --exclude-lint-knip true --exclude-lint-package-json true --exclude-lint-perfectionist true --owner TestOwner --repository test-repository --skip-github-api true --skip-install true --skip-removal true --title \\"Test Title\\""',
		);
	});
});
