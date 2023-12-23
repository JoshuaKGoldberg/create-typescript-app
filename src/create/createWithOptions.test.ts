import { Octokit } from "octokit";
import { describe, expect, it, vi } from "vitest";

import { withSpinner, withSpinners } from "../shared/cli/spinners.js";
import { Options } from "../shared/types.js";
import { writeReadme } from "../steps/writeReadme/index.js";
import { writeStructure } from "../steps/writing/writeStructure.js";
import { createWithOptions } from "./createWithOptions.js";

const options: Options = {
	access: "public",
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

const mockOctokit = new Octokit();

const github = {
	auth: "auth-token",
	octokit: mockOctokit,
};

vi.mock("../cli/spinners.ts", () => ({
	withSpinner() {
		return () => ({});
	},
}));

vi.mock("../cli/spinners.ts", () => ({
	withSpinners() {
		return () => ({});
	},
}));

vi.mock("../steps/writing/writeStructure.js", () => ({
	writeStructure: vi.fn().mockResolvedValue(undefined),
}));

describe("createWithOptions", () => {
	it("passes the options parameter to the writeStructure function", async () => {
		await createWithOptions({ github, options });

		expect(writeStructure).toHaveBeenCalledWith(options);
		expect(writeReadme).toHaveBeenCalledWith(options);
	});
});
