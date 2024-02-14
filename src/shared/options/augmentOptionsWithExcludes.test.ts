import { describe, expect, it, vi } from "vitest";

import { Options } from "../types.js";
import { augmentOptionsWithExcludes } from "./augmentOptionsWithExcludes.js";

const mockSelect = vi.fn();

vi.mock("@clack/prompts", () => ({
	isCancel: () => false,
	get select() {
		return mockSelect;
	},
}));

const optionsBase = {
	access: "public",
	author: undefined,
	base: undefined,
	description: "",
	directory: ".",
	email: {
		github: "github@email.com",
		npm: "npm@email.com",
	},
	excludeAllContributors: undefined,
	excludeCompliance: undefined,
	excludeLintDeprecation: undefined,
	excludeLintESLint: undefined,
	excludeLintJSDoc: undefined,
	excludeLintJson: undefined,
	excludeLintKnip: undefined,
	excludeLintMd: undefined,
	excludeLintPackageJson: undefined,
	excludeLintPackages: undefined,
	excludeLintPerfectionist: undefined,
	excludeLintRegex: undefined,
	excludeLintSpelling: undefined,
	excludeLintStrict: undefined,
	excludeLintStylistic: undefined,
	excludeLintYml: undefined,
	excludeReleases: undefined,
	excludeRenovate: undefined,
	excludeTests: undefined,
	funding: undefined,
	logo: undefined,
	mode: "create",
	offline: true,
	owner: "",
	repository: "",
	skipGitHubApi: false,
	skipInstall: undefined,
	skipRemoval: undefined,
	skipRestore: undefined,
	skipUninstall: undefined,
	title: "",
} satisfies Options;

describe("augmentOptionsWithExcludes", () => {
	it("prompts for base when no exclusions are provided", async () => {
		const base = "everything";

		mockSelect.mockResolvedValue(base);

		const actual = await augmentOptionsWithExcludes(optionsBase);

		expect(actual).toEqual({
			...optionsBase,
			base,
		});
	});

	it("skips prompting returns options directly when exclusions are provided manually", async () => {
		const options = {
			...optionsBase,
			excludeCompliance: true,
		} satisfies Options;

		const actual = await augmentOptionsWithExcludes(options);

		expect(actual).toBe(options);
	});

	it("uses the 'common' base without prompting when provided manually", async () => {
		const options = {
			...optionsBase,
			base: "common",
		} satisfies Options;

		const actual = await augmentOptionsWithExcludes(options);

		expect(actual).toEqual({
			...options,
			excludeCompliance: true,
			excludeLintDeprecation: true,
			excludeLintESLint: true,
			excludeLintJSDoc: true,
			excludeLintJson: true,
			excludeLintMd: true,
			excludeLintPackageJson: true,
			excludeLintPackages: true,
			excludeLintPerfectionist: true,
			excludeLintRegex: true,
			excludeLintSpelling: true,
			excludeLintStrict: true,
			excludeLintStylistic: true,
			excludeLintYml: true,
		});
	});

	it("uses the 'minimum' base without prompting when provided manually", async () => {
		const options = {
			...optionsBase,
			base: "minimum",
		} satisfies Options;

		const actual = await augmentOptionsWithExcludes(options);

		expect(actual).toEqual({
			...options,
			excludeAllContributors: true,
			excludeCompliance: true,
			excludeLintDeprecation: true,
			excludeLintESLint: true,
			excludeLintJSDoc: true,
			excludeLintJson: true,
			excludeLintKnip: true,
			excludeLintMd: true,
			excludeLintPackageJson: true,
			excludeLintPackages: true,
			excludeLintPerfectionist: true,
			excludeLintRegex: true,
			excludeLintSpelling: true,
			excludeLintStrict: true,
			excludeLintStylistic: true,
			excludeLintYml: true,
			excludeReleases: true,
			excludeRenovate: true,
			excludeTests: true,
		});
	});

	it("uses the 'everything' base without prompting when provided manually", async () => {
		const options = {
			...optionsBase,
			base: "everything",
		} satisfies Options;

		const actual = await augmentOptionsWithExcludes(options);

		expect(actual).toStrictEqual(options);
	});
});
