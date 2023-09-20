import { describe, expect, it, vi } from "vitest";
import z from "zod";

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
	getPrefillOrPromptedOption() {
		return () => "mock";
	},
}));

vi.mock("./ensureRepositoryExists.js", () => ({
	ensureRepositoryExists() {
		return {
			github: mockOptions.github,
			repository: mockOptions.repository,
		};
	},
}));

vi.mock("../../shared/cli/spinners.ts", () => ({
	withSpinner() {
		return () => ({});
	},
}));

vi.mock("./augmentOptionsWithExcludes.js", () => ({
	augmentOptionsWithExcludes() {
		return { ...emptyOptions, ...mockOptions };
	},
}));

describe("readOptions", () => {
	it("cancels the function when --email is invalid", async () => {
		const validationResult = z
			.object({ email: z.string().email() })
			.safeParse({ email: "wrongEmail" });

		expect(await readOptions(["--email", "wrongEmail"])).toStrictEqual({
			cancelled: true,
			options: { ...emptyOptions, email: "wrongEmail" },
			zodError: (validationResult as z.SafeParseError<{ email: string }>).error,
		});
	});

	it("successfully runs the function when --base is valid", async () => {
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
