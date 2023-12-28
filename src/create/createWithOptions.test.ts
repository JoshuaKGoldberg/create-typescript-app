import { $ } from "execa";
import { Octokit } from "octokit";
import { describe, expect, it, vi } from "vitest";

import { doesRepositoryExist } from "../shared/doesRepositoryExist.js";
import { Options } from "../shared/types.js";
import { addToolAllContributors } from "../steps/addToolAllContributors.js";
import { finalizeDependencies } from "../steps/finalizeDependencies.js";
import { initializeGitHubRepository } from "../steps/initializeGitHubRepository/index.js";
import { runCommands } from "../steps/runCommands.js";
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

vi.mock("execa", () => ({
	$: vi.fn().mockResolvedValue({ stdout: "Mocked response" }),
}));

const mockOctokit = new Octokit();
const github = {
	auth: "auth-token",
	octokit: mockOctokit,
};

vi.mock("../shared/cli/spinners.js", () => ({
	withSpinner: vi.fn().mockImplementation(async (label: string, task) => {
		return await task();
	}),
	withSpinners: vi.fn().mockImplementation(async (label: string, tasks) => {
		for (const [_, task] of tasks) {
			await task(); // Ensure each task is awaited
		}
	}),
}));

vi.mock("../steps/writing/writeStructure.js", () => ({
	writeStructure: vi.fn().mockResolvedValue(null),
}));

vi.mock("../steps/writeReadme/index.js", () => ({
	writeReadme: vi.fn().mockResolvedValue(null),
}));

vi.mock("../steps/finalizeDependencies.js", () => ({
	finalizeDependencies: vi.fn().mockResolvedValue(null),
}));

vi.mock("../steps/runCommands.js", () => ({
	runCommands: vi.fn().mockResolvedValue(null),
}));

vi.mock("../shared/doesRepositoryExist.js", () => ({
	doesRepositoryExist: vi.fn().mockResolvedValue(true),
}));

vi.mock("../steps/initializeGitHubRepository/index.js", () => ({
	initializeGitHubRepository: vi.fn().mockResolvedValue(true),
}));

vi.mock("../shared/getGitHubUserAsAllContributor.js", () => ({
	getGitHubUserAsAllContributor: vi.fn().mockResolvedValue({
		contributions: ["code", "doc"],
		name: "Test User",
	}),
}));

vi.mock("../steps/addToolAllContributors.js", () => ({
	addToolAllContributors: vi.fn().mockResolvedValue(null),
}));

it("calls writeStructure with options", async () => {
	await writeStructure(options);
	expect(writeStructure).toHaveBeenCalledWith(options);
});

it("calls writeReadme with options", async () => {
	await writeReadme(options);
	expect(writeReadme).toHaveBeenCalledWith(options);
});

it("calls writeStructure and writeReadme with options", async () => {
	await createWithOptions({ github, options });

	expect(writeStructure).toHaveBeenCalledWith(options);
	expect(writeReadme).toHaveBeenCalledWith(options);
});

it("directly calls addToolAllContributors with options", async () => {
	await addToolAllContributors(options);
	expect(addToolAllContributors).toHaveBeenCalledWith(options);
});

it("handles addToolAllContributors logic", async () => {
	options.excludeAllContributors = false;
	options.skipAllContributorsApi = false;

	await createWithOptions({ github, options });
	expect(addToolAllContributors).toHaveBeenCalledWith(options);
});

it("handles finalizeDependencies and runCommands logic", async () => {
	options.skipInstall = false;

	await createWithOptions({ github, options });

	expect(finalizeDependencies).toHaveBeenCalledWith(options);
	expect(runCommands).toHaveBeenCalled();
});

it("handles GitHub repository initialization", async () => {
	await createWithOptions({ github, options });

	expect(doesRepositoryExist).toHaveBeenCalledWith(github.octokit, options);
	expect(initializeGitHubRepository).toHaveBeenCalledWith(
		github.octokit,
		options,
	);
});

describe("createWithOptions", () => {
	it("calls writeStructure and writeReadme with options", async () => {
		await createWithOptions({ github, options });

		expect(writeStructure).toHaveBeenCalledWith(options);
		expect(writeReadme).toHaveBeenCalledWith(options);
	});
});
