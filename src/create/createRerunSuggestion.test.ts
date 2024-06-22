import { describe, expect, it } from "vitest";

import { getExclusions } from "../shared/options/exclusionKeys.js";
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
	it("prints no options when no options are provided", () => {
		const actual = createRerunSuggestion({});

		expect(actual).toMatchInlineSnapshot(`"npx create-typescript-app"`);
	});

	it("prints only mode when no other options are provided", () => {
		const actual = createRerunSuggestion({
			mode: "create",
		});

		expect(actual).toMatchInlineSnapshot(
			`"npx create-typescript-app --mode create"`,
		);
	});

	it("includes key-value pairs with mixed truthy and falsy values", () => {
		const actual = createRerunSuggestion(options);

		expect(actual).toMatchInlineSnapshot(
			`"npx create-typescript-app --base everything --author TestAuthor --description "Test description." --directory . --email-github github@email.com --email-npm npm@email.com --exclude-all-contributors --exclude-compliance --exclude-lint-jsdoc --exclude-lint-json --exclude-lint-knip --exclude-lint-package-json --exclude-lint-perfectionist --keywords "abc def ghi jkl mno pqr" --mode create --owner TestOwner --repository test-repository --skip-github-api --skip-install --skip-removal --title "Test Title""`,
		);
	});

	it("includes a non-default value when specified", () => {
		const actual = createRerunSuggestion({
			...options,
			access: "restricted",
		});

		expect(actual).toMatchInlineSnapshot(
			`"npx create-typescript-app --base everything --access restricted --author TestAuthor --description "Test description." --directory . --email-github github@email.com --email-npm npm@email.com --exclude-all-contributors --exclude-compliance --exclude-lint-jsdoc --exclude-lint-json --exclude-lint-knip --exclude-lint-package-json --exclude-lint-perfectionist --keywords "abc def ghi jkl mno pqr" --mode create --owner TestOwner --repository test-repository --skip-github-api --skip-install --skip-removal --title "Test Title""`,
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
			`"npx create-typescript-app --base everything --author TestAuthor --description "Test description." --directory . --email-github github@email.com --email-npm npm@email.com --exclude-all-contributors --exclude-compliance --exclude-lint-jsdoc --exclude-lint-json --exclude-lint-knip --exclude-lint-package-json --exclude-lint-perfectionist --guide https://example.com --guide-title "Test Title" --keywords "abc def ghi jkl mno pqr" --mode initialize --owner TestOwner --repository test-repository --skip-github-api --skip-install --skip-removal --title "Test Title""`,
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
			`"npx create-typescript-app --base everything --author TestAuthor --description "Test description." --directory . --email-github github@email.com --email-npm npm@email.com --exclude-all-contributors --exclude-compliance --exclude-lint-jsdoc --exclude-lint-json --exclude-lint-knip --exclude-lint-package-json --exclude-lint-perfectionist --keywords "abc def ghi jkl mno pqr" --logo test/src.png --logo-alt "Test alt." --mode initialize --owner TestOwner --repository test-repository --skip-github-api --skip-install --skip-removal --title "Test Title""`,
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
			`"npx create-typescript-app --base everything --author TestAuthor --description "Test description." --directory . --email-github github@email.com --email-npm npm@email.com --exclude-all-contributors --exclude-compliance --exclude-lint-jsdoc --exclude-lint-json --exclude-lint-knip --exclude-lint-md --exclude-lint-package-json --exclude-lint-perfectionist --exclude-lint-spelling --keywords "abc def ghi jkl mno pqr" --mode initialize --owner TestOwner --repository test-repository --skip-github-api --skip-install --skip-removal --title "Test Title""`,
		);
	});

	it("does not list all excludes when using common base", () => {
		const common = createRerunSuggestion({
			base: "common",
			...getExclusions(options, "common"),
			excludeLintKnip: undefined,
		});

		expect(common).toMatchInlineSnapshot(
			`"npx create-typescript-app --base common"`,
		);
	});

	it("does not list all excludes when using minimal base", () => {
		const minimal = createRerunSuggestion({
			base: "minimal",
			...getExclusions(options, "minimal"),
			excludeLintKnip: undefined,
		});

		expect(minimal).toMatchInlineSnapshot(
			`"npx create-typescript-app --base minimal"`,
		);
	});

	it("does not list API skip flags when --offline is true", () => {
		const actual = createRerunSuggestion({
			...options,
			offline: true,
			skipAllContributorsApi: true,
			skipGitHubApi: true,
		});

		expect(actual).toMatchInlineSnapshot(
			`"npx create-typescript-app --base everything --author TestAuthor --description "Test description." --directory . --email-github github@email.com --email-npm npm@email.com --exclude-all-contributors --exclude-compliance --exclude-lint-jsdoc --exclude-lint-json --exclude-lint-knip --exclude-lint-package-json --exclude-lint-perfectionist --keywords "abc def ghi jkl mno pqr" --mode create --offline --owner TestOwner --repository test-repository --skip-install --skip-removal --title "Test Title""`,
		);
	});
});
