import { describe, expect, it, vi } from "vitest";

import { GitHub } from "../shared/options/getGitHub.js";
import { Options } from "../shared/types.js";
import { initializeWithOptions } from "./initializeWithOptions.js";

vi.mock("../shared/cli/spinners.js", () => ({
	async withSpinner(_label: string, task: () => Promise<void>) {
		await task();
	},
	withSpinners: vi.fn(),
}));

const mockAddOwnerAsAllContributor = vi.fn();

vi.mock("../steps/addOwnerAsAllContributor.js", () => ({
	get addOwnerAsAllContributor() {
		return mockAddOwnerAsAllContributor;
	},
}));

const mockClearChangelog = vi.fn();

vi.mock("../steps/clearChangelog.js", () => ({
	get clearChangelog() {
		return mockClearChangelog;
	},
}));

const mockInitializeGitHubRepository = vi.fn();

vi.mock("../steps/initializeGitHubRepository/index.js", () => ({
	get initializeGitHubRepository() {
		return mockInitializeGitHubRepository;
	},
}));

const mockRemoveSetupScripts = vi.fn();

vi.mock("../steps/removeSetupScripts.js", () => ({
	get removeSetupScripts() {
		return mockRemoveSetupScripts;
	},
}));

const mockResetGitTags = vi.fn();

vi.mock("../steps/resetGitTags.js", () => ({
	get resetGitTags() {
		return mockResetGitTags;
	},
}));

const mockRunCleanup = vi.fn();

vi.mock("../steps/runCleanup.js", () => ({
	get runCleanup() {
		return mockRunCleanup;
	},
}));

const mockUninstallPackages = vi.fn();

vi.mock("../steps/uninstallPackages.js", () => ({
	get uninstallPackages() {
		return mockUninstallPackages;
	},
}));

const optionsBase = {} as Options;

describe("initializeWithOptions", () => {
	it("runs addOwnerAsAllContributor when excludeAllContributors is false", async () => {
		const options = {
			...optionsBase,
			excludeAllContributors: false,
		};

		await initializeWithOptions({
			github: undefined,
			options,
		});

		expect(mockAddOwnerAsAllContributor).toHaveBeenCalledWith(
			undefined,
			options,
		);
	});

	it("does not run addOwnerAsAllContributor when excludeAllContributors is true", async () => {
		const options = {
			...optionsBase,
			excludeAllContributors: true,
		};

		await initializeWithOptions({
			github: undefined,
			options,
		});

		expect(mockAddOwnerAsAllContributor).not.toHaveBeenCalled();
	});

	it("runs initializeGitHubRepository when github is truthy", async () => {
		const github = {
			octokit: {},
		} as GitHub;

		await initializeWithOptions({
			github,
			options: optionsBase,
		});

		expect(mockInitializeGitHubRepository).toHaveBeenCalledWith(
			github.octokit,
			optionsBase,
		);
	});

	it("does not run initializeGitHubRepository when github is falsy", async () => {
		const options = {
			...optionsBase,
			excludeAllContributors: true,
		};

		await initializeWithOptions({
			github: undefined,
			options,
		});

		expect(mockInitializeGitHubRepository).not.toHaveBeenCalled();
	});

	it("runs removeSetupScripts when skipRemoval is false", async () => {
		const options = {
			...optionsBase,
			skipRemoval: false,
		};

		await initializeWithOptions({
			github: undefined,
			options,
		});

		expect(mockRemoveSetupScripts).toHaveBeenCalled();
	});

	it("does not run removeSetupScripts when skipRemoval is true", async () => {
		const options = {
			...optionsBase,
			skipRemoval: true,
		};

		await initializeWithOptions({
			github: undefined,
			options,
		});

		expect(mockRemoveSetupScripts).not.toHaveBeenCalled();
	});

	it("runs uninstallPackages when skipUninstall is false", async () => {
		const options = {
			...optionsBase,
			offline: true,
			skipUninstall: false,
		};

		await initializeWithOptions({
			github: undefined,
			options,
		});

		expect(mockUninstallPackages).toHaveBeenCalledWith(options.offline);
	});

	it("does not run uninstallPackages when skipUninstall is true", async () => {
		const options = {
			...optionsBase,
			skipUninstall: true,
		};

		await initializeWithOptions({
			github: undefined,
			options,
		});

		expect(mockUninstallPackages).not.toHaveBeenCalled();
	});
});
