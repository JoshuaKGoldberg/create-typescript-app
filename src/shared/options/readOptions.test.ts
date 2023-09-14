import { describe, expect, it, vi } from "vitest";

import { readOptions } from "./readOptions.js";

const emptyOptions = {
	author: undefined,
	base: undefined,
	createRepository: undefined,
	description: undefined,
	email: undefined,
	excludeCompliance: undefined,
	excludeContributors: undefined,
	excludeLintJson: undefined,
	excludeLintKnip: undefined,
	excludeLintMd: undefined,
	excludeLintPackageJson: undefined,
	excludeLintPackages: undefined,
	excludeLintPerfectionist: undefined,
	excludeLintSpelling: undefined,
	excludeLintYml: undefined,
	excludeReleases: undefined,
	excludeRenovate: undefined,
	excludeTests: undefined,
	funding: undefined,
	owner: undefined,
	repository: undefined,
	skipGitHubApi: false,
	skipInstall: false,
	skipRemoval: false,
	skipRestore: undefined,
	skipUninstall: false,
	title: undefined,
};

const mockOptions = {
	base: "prompt",
	github: "mock.git",
	repository: "mock.repository",
};

vi.mock("./getPrefillOrPromptedOption.js", () => ({
	get getPrefillOrPromptedOption() {
		return vi.fn(() => "mock");
	},
}));

vi.mock("./ensureRepositoryExists.js", () => ({
	get ensureRepositoryExists() {
		return vi.fn(() => ({
			github: mockOptions.github,
			repository: mockOptions.repository,
		}));
	},
}));

vi.mock("./getGithub.js", () => ({
	get getGithub() {
		return vi.fn(() => ({}));
	},
}));

vi.mock("./augmentOptionsWithExcludes.js", () => ({
	get augmentOptionsWithExcludes() {
		return vi.fn(() => ({ ...emptyOptions, ...mockOptions }));
	},
}));

describe("readOptions", () => {
	it("validates unsupported argument and cancels the function", async () => {
		expect(await readOptions(["--base", "true"])).toStrictEqual({
			cancelled: true,
			options: emptyOptions,
		});
	});

	it("validates valid argument and continues function execution", async () => {
		expect(await readOptions(["--base", mockOptions.base])).toStrictEqual({
			cancelled: false,
			github: mockOptions.github,
			options: {
				...emptyOptions,
				...mockOptions,
			},
		});
	});
});
