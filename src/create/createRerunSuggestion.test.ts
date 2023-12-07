import { describe, expect, it } from "vitest";

import { getExclusions } from "../shared/options/augmentOptionsWithExcludes.js";
import { Options } from "../shared/types.js";
import { createRerunSuggestion } from "./createRerunSuggestion.js";

const options = {
	access: "public",
	author: "TestAuthor",
	base: "everything",
	description: "Test description.",
	directory: ".",
	email: {
		github: "github@email.com",
		npm: "npm@email.com",
	},
	excludeAllContributors: true,
	excludeCompliance: true,
	excludeLintJSDoc: true,
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
	keywords: ["abc", "def ghi", "jkl mno pqr"],
	mode: "create",
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
		const actual = createRerunSuggestion(options);

		expect(actual).toMatchInlineSnapshot(
			`"npx create-typescript-app --mode create --base everything --access public --author TestAuthor --description "Test description." --directory . --email-github github@email.com --email-npm npm@email.com --exclude-all-contributors true --exclude-compliance true --exclude-lint-jsdoc true --exclude-lint-json true --exclude-lint-knip true --exclude-lint-package-json true --exclude-lint-perfectionist true --keywords "abc def ghi jkl mno pqr" --mode create --owner TestOwner --repository test-repository --skip-github-api true --skip-install true --skip-removal true --title "Test Title""`,
		);
	});

	it("includes stringified guide when it exists", () => {
		const actual = createRerunSuggestion({
			...options,
			guide: {
				href: "https://example.com",
				title: "Test Title",
			},
			mode: "initialize",
		});

		expect(actual).toMatchInlineSnapshot(
			`"npx create-typescript-app --mode initialize --base everything --access public --author TestAuthor --description "Test description." --directory . --email-github github@email.com --email-npm npm@email.com --exclude-all-contributors true --exclude-compliance true --exclude-lint-jsdoc true --exclude-lint-json true --exclude-lint-knip true --exclude-lint-package-json true --exclude-lint-perfectionist true --guide https://example.com --guide-title "Test Title" --keywords "abc def ghi jkl mno pqr" --mode initialize --owner TestOwner --repository test-repository --skip-github-api true --skip-install true --skip-removal true --title "Test Title""`,
		);
	});

	it("includes stringified logo when it exists", () => {
		const actual = createRerunSuggestion({
			...options,
			logo: {
				alt: "Test alt.",
				src: "test/src.png",
			},
			mode: "initialize",
		});

		expect(actual).toMatchInlineSnapshot(
			`"npx create-typescript-app --mode initialize --base everything --access public --author TestAuthor --description "Test description." --directory . --email-github github@email.com --email-npm npm@email.com --exclude-all-contributors true --exclude-compliance true --exclude-lint-jsdoc true --exclude-lint-json true --exclude-lint-knip true --exclude-lint-package-json true --exclude-lint-perfectionist true --keywords "abc def ghi jkl mno pqr" --logo test/src.png --logo-alt "Test alt." --mode initialize --owner TestOwner --repository test-repository --skip-github-api true --skip-install true --skip-removal true --title "Test Title""`,
		);
	});

	it("includes exclusions when they exist", () => {
		const actual = createRerunSuggestion({
			...options,
			excludeCompliance: true,
			excludeLintMd: true,
			excludeLintSpelling: true,
			mode: "initialize",
		});

		expect(actual).toMatchInlineSnapshot(
			`"npx create-typescript-app --mode initialize --base everything --access public --author TestAuthor --description "Test description." --directory . --email-github github@email.com --email-npm npm@email.com --exclude-all-contributors true --exclude-compliance true --exclude-lint-jsdoc true --exclude-lint-json true --exclude-lint-knip true --exclude-lint-md true --exclude-lint-package-json true --exclude-lint-perfectionist true --exclude-lint-spelling true --keywords "abc def ghi jkl mno pqr" --mode initialize --owner TestOwner --repository test-repository --skip-github-api true --skip-install true --skip-removal true --title "Test Title""`,
		);
	});

	it("does not list all excludes when using common base", () => {
		const common = createRerunSuggestion({
			base: "common",
			...getExclusions(options, "common"),
			excludeLintKnip: undefined,
		});

		expect(common).toMatchInlineSnapshot(
			'"npx create-typescript-app --mode undefined --base common"',
		);
	});

	it("does not list all excludes when using minimum base", () => {
		const minimum = createRerunSuggestion({
			base: "minimum",
			...getExclusions(options, "minimum"),
			excludeLintKnip: undefined,
		});

		expect(minimum).toMatchInlineSnapshot(
			'"npx create-typescript-app --mode undefined --base minimum"',
		);
	});
});
