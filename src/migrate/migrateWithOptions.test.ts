import { Octokit } from "octokit";
import { describe, expect, it, vi } from "vitest";

import { Options } from "../shared/types.js";
import { migrateWithOptions } from "./migrateWithOptions.js";

vi.mock("../shared/cli/spinners.js", () => ({
	async withSpinner(_label: string, task: () => Promise<void>) {
		await task();
	},
	withSpinners: vi.fn(),
}));

const mockPopulateAllContributorsForRepository = vi.fn();

vi.mock("populate-all-contributors-for-repository", () => ({
	get populateAllContributorsForRepository() {
		return mockPopulateAllContributorsForRepository;
	},
}));

const mockFinalizeDependencies = vi.fn();

vi.mock("../steps/finalizeDependencies.js", () => ({
	get finalizeDependencies() {
		return mockFinalizeDependencies;
	},
}));

const mockInitializeGitHubRepository = vi.fn();

vi.mock("../steps/initializeGitHubRepository/index.js", () => ({
	get initializeGitHubRepository() {
		return mockInitializeGitHubRepository;
	},
}));

const mockPopulateCSpellDictionary = vi.fn();

vi.mock("../steps/populateCSpellDictionary.js", () => ({
	get populateCSpellDictionary() {
		return mockPopulateCSpellDictionary;
	},
}));

vi.mock("../steps/runCleanup.js", () => ({
	runCleanup: vi.fn(),
}));

vi.mock("../shared/cli/spinners.js", () => ({
	async withSpinner(_label: string, task: () => Promise<void>) {
		await task();
	},
	withSpinners: vi.fn(),
}));

const mockGitHubAndOptions = vi.fn();

vi.mock("../shared/options/readOptions.js", () => ({
	get GitHubAndOptions() {
		return mockGitHubAndOptions;
	},
}));

const optionsBase = {} as Options;

describe("migrateWithOptions", () => {
	it("runs initializeGitHubRepository when octokit is truthy", async () => {
		const octokit = {} as Octokit;

		await migrateWithOptions({
			octokit,
			options: optionsBase,
		});

		expect(mockInitializeGitHubRepository).toHaveBeenCalledWith(
			octokit,
			optionsBase,
		);
	});

	it("does not run initializeGitHubRepository when github is falsy", async () => {
		const options = {
			...optionsBase,
			excludeAllContributors: true,
		};

		await migrateWithOptions({
			octokit: undefined,
			options,
		});

		expect(mockInitializeGitHubRepository).not.toHaveBeenCalled();
	});

	it("does not run populateAllContributorsForRepository excludeAllContributors is true", async () => {
		const options = {
			...optionsBase,
			excludeAllContributors: true,
			skipAllContributorsApi: false,
		};

		await migrateWithOptions({
			octokit: undefined,
			options,
		});

		expect(mockPopulateAllContributorsForRepository).not.toHaveBeenCalled();
	});

	it("does not run populateAllContributorsForRepository skipAllContributorsApi is true", async () => {
		const options = {
			...optionsBase,
			excludeAllContributors: false,
			skipAllContributorsApi: true,
		};

		await migrateWithOptions({
			octokit: undefined,
			options,
		});

		expect(mockPopulateAllContributorsForRepository).not.toHaveBeenCalled();
	});

	it("runs populateAllContributorsForRepository excludeAllContributors and skipAllContributorsApi are false", async () => {
		const options = {
			...optionsBase,
			excludeAllContributors: false,
			skipAllContributorsApi: false,
		};

		await migrateWithOptions({
			octokit: undefined,
			options,
		});

		expect(mockPopulateAllContributorsForRepository).toHaveBeenCalledWith({
			owner: options.owner,
			repo: options.repository,
		});
	});

	it("runs finalizeDependencies when skipInstall is false", async () => {
		const options = {
			...optionsBase,
			skipInstall: false,
		};

		await migrateWithOptions({
			octokit: undefined,
			options,
		});

		expect(mockFinalizeDependencies).toHaveBeenCalledWith(options);
	});

	it("does not run finalizeDependencies when skipInstall is true", async () => {
		const options = {
			...optionsBase,
			skipInstall: true,
		};

		await migrateWithOptions({
			octokit: undefined,
			options,
		});

		expect(mockFinalizeDependencies).not.toHaveBeenCalled();
	});

	it("runs populateCSpellDictionary when excludeLintSpelling is false", async () => {
		const options = {
			...optionsBase,
			excludeLintSpelling: false,
		};

		await migrateWithOptions({
			octokit: undefined,
			options,
		});

		expect(mockPopulateCSpellDictionary).toHaveBeenCalled();
	});

	it("does not run populateCSpellDictionary when excludeLintSpelling is true", async () => {
		const options = {
			...optionsBase,
			excludeLintSpelling: true,
		};

		await migrateWithOptions({
			octokit: undefined,
			options,
		});

		expect(mockPopulateCSpellDictionary).not.toHaveBeenCalled();
	});
});
