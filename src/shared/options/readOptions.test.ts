import { describe, expect, it, vi } from "vitest";
import z from "zod";

import { optionsSchemaShape } from "./optionsSchema.js";
import { readOptions } from "./readOptions.js";

const emptyOptions = {
	access: undefined,
	author: undefined,
	base: undefined,
	createRepository: undefined,
	description: undefined,
	email: undefined,
	excludeCompliance: undefined,
	excludeContributors: undefined,
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
	owner: undefined,
	repository: undefined,
	skipGitHubApi: undefined,
	skipInstall: undefined,
	skipRemoval: undefined,
	skipRestore: undefined,
	skipUninstall: undefined,
	title: undefined,
};

const mockOptions = {
	base: "prompt",
	github: "mock.git",
	repository: "mock.repository",
};

vi.mock("../cli/spinners.ts", () => ({
	withSpinner() {
		return () => ({});
	},
}));

const mockAugmentOptionsWithExcludes = vi.fn();

vi.mock("./augmentOptionsWithExcludes.js", () => ({
	get augmentOptionsWithExcludes() {
		return mockAugmentOptionsWithExcludes;
	},
	// return { ...emptyOptions, ...mockOptions };
}));

const mockDetectEmailRedundancy = vi.fn();

vi.mock("./detectEmailRedundancy.js", () => ({
	get detectEmailRedundancy() {
		return mockDetectEmailRedundancy;
	},
}));

const mockGetPrefillOrPromptedOption = vi.fn();

vi.mock("./getPrefillOrPromptedOption.js", () => ({
	get getPrefillOrPromptedOption() {
		return mockGetPrefillOrPromptedOption;
	},
}));

const mockEnsureRepositoryExists = vi.fn();

vi.mock("./ensureRepositoryExists.js", () => ({
	get ensureRepositoryExists() {
		return mockEnsureRepositoryExists;
	},
}));

vi.mock("./getGitHub.js", () => ({
	getGitHub() {
		return undefined;
	},
}));

vi.mock("./readOptionDefaults/index.js", () => ({
	readOptionDefaults() {
		return {
			author: vi.fn(),
			description: vi.fn(),
			email: vi.fn(),
			funding: vi.fn(),
			logo: vi.fn(),
			owner: vi.fn(),
			repository: vi.fn(),
			title: vi.fn(),
		};
	},
}));

describe("readOptions", () => {
	it("returns a cancellation when an arg is invalid", async () => {
		const validationResult = z
			.object({ base: optionsSchemaShape.base })
			.safeParse({ base: "b" });

		const actual = await readOptions(["--base", "b"], "create");

		expect(actual).toStrictEqual({
			cancelled: true,
			error: (validationResult as z.SafeParseError<{ base: string }>).error,
			options: { ...emptyOptions, base: "b" },
		});
	});

	it("returns a cancellation when an email redundancy is detected", async () => {
		const error = "Too many emails!";
		mockDetectEmailRedundancy.mockReturnValue(error);
		mockGetPrefillOrPromptedOption.mockImplementation(() => undefined);

		expect(await readOptions([], "create")).toStrictEqual({
			cancelled: true,
			error,
			options: {
				...emptyOptions,
			},
		});
	});

	it("returns a cancellation when the owner prompt is cancelled", async () => {
		mockDetectEmailRedundancy.mockReturnValue(false);
		mockGetPrefillOrPromptedOption.mockImplementation(() => undefined);

		expect(await readOptions([], "create")).toStrictEqual({
			cancelled: true,
			options: {
				...emptyOptions,
			},
		});
	});

	it("returns a cancellation when the repository prompt is cancelled", async () => {
		mockDetectEmailRedundancy.mockReturnValue(false);
		mockGetPrefillOrPromptedOption
			.mockImplementationOnce(() => "MockOwner")
			.mockImplementation(() => undefined);

		expect(await readOptions([], "create")).toStrictEqual({
			cancelled: true,
			options: {
				...emptyOptions,
				owner: "MockOwner",
			},
		});
	});

	it("returns a cancellation when ensureRepositoryPrompt does not return a repository", async () => {
		mockDetectEmailRedundancy.mockReturnValue(false);
		mockGetPrefillOrPromptedOption
			.mockImplementationOnce(() => "MockOwner")
			.mockImplementationOnce(() => "MockRepository")
			.mockImplementation(() => undefined);
		mockEnsureRepositoryExists.mockResolvedValue({});

		expect(await readOptions([], "create")).toStrictEqual({
			cancelled: true,
			options: {
				...emptyOptions,
				owner: "MockOwner",
				repository: "MockRepository",
			},
		});
	});

	it("returns a cancellation when the description prompt is cancelled", async () => {
		mockDetectEmailRedundancy.mockReturnValue(false);
		mockGetPrefillOrPromptedOption
			.mockImplementationOnce(() => "MockOwner")
			.mockImplementationOnce(() => "MockRepository")
			.mockImplementation(() => undefined);
		mockEnsureRepositoryExists.mockResolvedValue({
			github: mockOptions.github,
			repository: mockOptions.repository,
		});

		expect(await readOptions([], "create")).toStrictEqual({
			cancelled: true,
			options: {
				...emptyOptions,
				owner: "MockOwner",
				repository: "MockRepository",
			},
		});
	});

	it("returns a cancellation when the title prompt is cancelled", async () => {
		mockDetectEmailRedundancy.mockReturnValue(false);
		mockGetPrefillOrPromptedOption
			.mockImplementationOnce(() => "MockOwner")
			.mockImplementationOnce(() => "MockRepository")
			.mockImplementationOnce(() => "Mock description.")
			.mockImplementation(() => undefined);
		mockEnsureRepositoryExists.mockResolvedValue({
			github: mockOptions.github,
			repository: mockOptions.repository,
		});

		expect(await readOptions([], "create")).toStrictEqual({
			cancelled: true,
			options: {
				...emptyOptions,
				description: "Mock description.",
				owner: "MockOwner",
				repository: "MockRepository",
			},
		});
	});

	it("returns a cancellation when the logo alt prompt is cancelled", async () => {
		mockDetectEmailRedundancy.mockReturnValue(false);
		mockGetPrefillOrPromptedOption
			.mockImplementationOnce(() => "MockOwner")
			.mockImplementationOnce(() => "MockRepository")
			.mockImplementationOnce(() => "Mock description.")
			.mockImplementation(() => undefined);
		mockEnsureRepositoryExists.mockResolvedValue({
			github: mockOptions.github,
			repository: mockOptions.repository,
		});

		expect(await readOptions(["--logo", "logo.svg"], "create")).toStrictEqual({
			cancelled: true,
			options: {
				...emptyOptions,
				description: "Mock description.",
				owner: "MockOwner",
				repository: "MockRepository",
			},
		});
	});

	it("returns a cancellation when the email prompt is cancelled", async () => {
		mockDetectEmailRedundancy.mockReturnValue(false);
		mockGetPrefillOrPromptedOption
			.mockImplementationOnce(() => "MockOwner")
			.mockImplementationOnce(() => "MockRepository")
			.mockImplementationOnce(() => "Mock description.")
			.mockImplementationOnce(() => "Mock title.")
			.mockImplementation(() => undefined);
		mockEnsureRepositoryExists.mockResolvedValue({
			github: mockOptions.github,
			repository: mockOptions.repository,
		});

		expect(await readOptions([], "create")).toStrictEqual({
			cancelled: true,
			options: {
				...emptyOptions,
				description: "Mock description.",
				owner: "MockOwner",
				repository: "MockRepository",
				title: "Mock title.",
			},
		});
	});

	it("returns a cancellation when augmentOptionsWithExcludes returns undefined", async () => {
		mockDetectEmailRedundancy.mockReturnValue(false);
		mockGetPrefillOrPromptedOption
			.mockImplementationOnce(() => "MockOwner")
			.mockImplementationOnce(() => "MockRepository")
			.mockImplementationOnce(() => "Mock description.")
			.mockImplementationOnce(() => "Mock title.")
			.mockImplementation(() => undefined);
		mockEnsureRepositoryExists.mockResolvedValue({
			github: mockOptions.github,
			repository: mockOptions.repository,
		});
		mockAugmentOptionsWithExcludes.mockResolvedValue(undefined);

		expect(await readOptions([], "create")).toStrictEqual({
			cancelled: true,
			options: {
				...emptyOptions,
				description: "Mock description.",
				owner: "MockOwner",
				repository: "MockRepository",
				title: "Mock title.",
			},
		});
	});

	it("returns success options when --base is valid", async () => {
		mockAugmentOptionsWithExcludes.mockResolvedValue({
			...emptyOptions,
			...mockOptions,
		});
		mockGetPrefillOrPromptedOption.mockImplementation(() => "mock");

		expect(
			await readOptions(["--base", mockOptions.base], "create"),
		).toStrictEqual({
			cancelled: false,
			github: mockOptions.github,
			options: {
				...emptyOptions,
				...mockOptions,
			},
		});
	});
});
