import { Octokit } from "octokit";
import { describe, expect, it, vi } from "vitest";

import { Options } from "../shared/types.js";
import { addToolAllContributors } from "../steps/addToolAllContributors.js";
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

const options: Options = {
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

// Mock withSpinner
vi.mock("../cli/spinners.ts", () => ({
	withSpinner() {
		return () => ({});
	},
}));

// Mock withSpinners
vi.mock("../cli/spinners.ts", () => ({
	withSpinners() {
		return () => ({});
	},
}));

// Mock $
vi.mock("execa", () => ({
	$: vi.fn(),
}));

describe("createWithOptions", () => {
	// test the writeStructure function
	it("creates a repository structure for GitHub", async () => {
		// Mock the writeStructure function
		const mockWriteStructure = vi.fn();
		vi.mock("../steps/writing/writeStructure.js", () => ({
			writeStructure: mockWriteStructure,
		}));

		// Call createWithOptions with the mock data
		const result = await createWithOptions({ github, options });

		// Check to make sure that writeStructure was called with the expected options
		expect(mockWriteStructure).toHaveBeenCalledWith(options);

		// Check to make sure that the options have been sent to GitHub
		expect(result.sentToGitHub).toBe(true);
	});

	// test the writeReadme function
	it("creates a README file", async () => {
		// Mock the writeReadme function to track if it's called with the correct options
		const mockWriteReadme = vi.fn();
		vi.mock("../steps/writeReadme/index.js", () => ({
			writeReadme: mockWriteReadme,
		}));

		// Call createWithOptions with the test-specific data
		const readMe = await mockWriteReadme(async () => {
			await createWithOptions({ github, options });
		});

		// Assert that writeReadme was called with the expected options
		expect(mockWriteReadme).toHaveBeenCalledWith(options);

		// Check that the generated README content matches the values passed to it
		expect(readMe).toContain(options.title);
		expect(readMe).toContain(`Author: ${options.author}`);
		expect(readMe).toContain(`Base: ${options.base}`);
		expect(readMe).toContain(`Description: ${options.description}`);
		expect(readMe).toContain(`Directory: ${options.directory}`);
		expect(readMe).toContain(`Title: ${options.title}`);
		expect(readMe).toContain(`Repository: ${options.repository}`);
	});

	it("should add the author as a tool contributor if conditions are met", async () => {
		// Mock addToolAllContributors to track if it's called
		const mockAddToolAllContributors = vi.fn();
		vi.mock("../steps/addToolAllContributors.js", () => ({
			addToolAllContributors: mockAddToolAllContributors,
		}));

		// Check that addToolAllContributors was called with the provided options
		expect(mockAddToolAllContributors).toBe(true);

		// Call the function that triggers the behavior you want to test
		await addToolAllContributors(options);

		// Check that addToolAllContributors was called with the provided options
		expect(mockAddToolAllContributors).toBeCalledWith(
			`npx -y all-contributors-cli add ${options.author} tool`,
		);
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
