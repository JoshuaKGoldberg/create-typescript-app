import { describe, expect, it } from "vitest";

import { Options } from "../shared/types.js";
import { createRerunSuggestion } from "./createRerunSuggestion.js";

const options = {
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
	logo: undefined,
	owner: "TestOwner",
	repository: "test-repository",
	skipGitHubApi: true,
	skipInstall: true,
	skipRemoval: true,
	skipRestore: undefined,
	skipUninstall: undefined,
	title: "Test Title",
} satisfies Options;

describe("createRerunSuggestion", () => {
	it("includes key-value pairs with mixed truthy and falsy values", () => {
		const actual = createRerunSuggestion("initialize", options);

		expect(actual).toMatchInlineSnapshot(
			'"npx create-typescript-app --mode initialize --author TestAuthor --base everything --createrepository true --description \\"Test description.\\" --email test@test.com --excludecompliance true --excludecontributors true --excludelintjson true --excludelintknip true --excludelintpackagejson true --excludelintperfectionist true --owner TestOwner --repository test-repository --skipgithubapi true --skipinstall true --skipremoval true --title \\"Test Title\\""',
		);
	});

	it("includes stringifies logo when it exists", () => {
		const actual = createRerunSuggestion("initialize", {
			...options,
			logo: {
				alt: "Test alt.",
				src: "test/src.png",
			},
		});

		expect(actual).toMatchInlineSnapshot(
			'"npx create-typescript-app --mode initialize --author TestAuthor --base everything --createrepository true --description \\"Test description.\\" --email test@test.com --excludecompliance true --excludecontributors true --excludelintjson true --excludelintknip true --excludelintpackagejson true --excludelintperfectionist true --logo test/src.png --logoalt \\"Test alt.\\" --owner TestOwner --repository test-repository --skipgithubapi true --skipinstall true --skipremoval true --title \\"Test Title\\""',
		);
	});
});
