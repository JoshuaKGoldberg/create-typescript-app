import { Octokit } from "octokit";
import { describe, expect, it, vi } from "vitest";

import { GitHub } from "../shared/options/getGitHub.js";
import { Options } from "../shared/types.js";
import { createWithOptions } from "./createWithOptions.js";

enum OptionsAccess {
	Public = "public",
	Restricted = "restricted",
}

const mockOctokit = new Octokit();

const github = {
	auth: "auth-token",
	octokit: mockOctokit,
};

const emptyOptions = {
	access: undefined,
	author: undefined,
	base: undefined,
	description: undefined,
	directory: undefined,
	email: undefined,
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
	excludeLintYml: undefined,
	excludeReleases: undefined,
	excludeRenovate: undefined,
	excludeTests: undefined,
	funding: undefined,
	offline: undefined,
	owner: undefined,
	preserveGeneratedFrom: false,
	repository: undefined,
	skipAllContributorsApi: undefined,
	skipGitHubApi: undefined,
	skipInstall: undefined,
	skipRemoval: undefined,
	skipRestore: undefined,
	skipUninstall: undefined,
	title: undefined,
};

const mockOptions: Options = {
	access: OptionsAccess.Public,
	author: "Test Author",
	base: "common",
	description: "Test Description",
	directory: "test-directory",
	email: { github: "github@example.com", npm: "npm@example.com" },
	excludeAllContributors: false,
	excludeCompliance: false,
	excludeLintDeprecation: false,
	excludeLintESLint: false,
	excludeLintJSDoc: false,
	excludeLintJson: false,
	excludeLintKnip: false,
	excludeLintMd: false,
	excludeLintPackageJson: false,
	excludeLintPackages: false,
	excludeLintPerfectionist: false,
	excludeLintRegex: false,
	excludeLintSpelling: false,
	excludeLintStrict: false,
	excludeLintStylistic: false,
	excludeLintYml: false,
	excludeReleases: false,
	excludeRenovate: false,
	excludeTests: false,
	funding: "Test Funding",
	keywords: ["test", "keywords"],
	logo: { alt: "Test Alt", src: "test.png" },
	mode: "create",
	offline: false,
	owner: "Test Owner",
	preserveGeneratedFrom: false,
	repository: "test-repo",
	skipAllContributorsApi: false,
	skipGitHubApi: false,
	skipInstall: false,
	skipRemoval: false,
	skipRestore: false,
	skipUninstall: false,
	title: "Test Title",
};

interface GitHubAndOptions {
	github: GitHub;
	options: Options;
}

describe("createWithOptions", () => {
	it("creates a repository structure for GitHub", async () => {
		// Mock the writeStructure function
		const mockWriteStructure = vi.fn();
		vi.mock("../steps/writing/writeStructure.js", () => ({
			writeStructure: mockWriteStructure,
		}));

		const options = mockOptions;

		// Call createWithOptions with the mock data
		const result = await createWithOptions({ github, options });

		// Assert that writeStructure was called with the expected options
		expect(mockWriteStructure).toHaveBeenCalledWith(options);

		expect(result.sentToGitHub).toBe(true);
	});

	it("creates a README file", async () => {
		// Mock the writeReadme function to track if it's called with the correct options
		const mockWriteReadme = vi.fn();
		vi.mock("../steps/writeReadme/index.js", () => ({
			writeReadme: mockWriteReadme,
		}));

		// Call createWithOptions with the test-specific data
		const result = await createWithOptions({ github, options });

		// Assert that writeReadme was called with the expected options
		expect(mockWriteReadme).toHaveBeenCalledWith(options);
	});

	it("adds contributors to the repository", async () => {
		expect(result).toEqual({
			outcome: "Contributors added",
		});
	});

	it("installs packages by calling finalizeDependecies", async () => {
		expect(result).toEqual({});
	});

	it("cleans up installation files", async () => {
		expect(result).toEqual({});
	});

	it("initializes the Github repository", async () => {
		expect(result).toEqual({});
	});

	it("returns a boolean to confirm the Github repository was initialized", async () => {
		expect(result).toEqual({});
	});
});
