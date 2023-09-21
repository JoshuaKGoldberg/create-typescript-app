import { describe, expect, it, vi } from "vitest";
import z from "zod";

import { optionsSchemaShape } from "./optionsSchema.js";
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

vi.mock("./augmentOptionsWithExcludes.js", () => ({
	augmentOptionsWithExcludes() {
		return { ...emptyOptions, ...mockOptions };
	},
}));

const mockGetPrefillOrPromptedOption = vi.fn();

vi.mock("./getPrefillOrPromptedOption.js", () => ({
	get getPrefillOrPromptedOption() {
		return mockGetPrefillOrPromptedOption;
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

		const actual = await readOptions(["--base", "b"]);

		expect(actual).toStrictEqual({
			cancelled: true,
			error: (validationResult as z.SafeParseError<{ base: string }>).error,
			options: { ...emptyOptions, base: "b" },
		});
	});

	it("returns a cancellation when the owner prompt is cancelled", async () => {
		mockGetPrefillOrPromptedOption.mockImplementation(() => undefined);

		expect(await readOptions([])).toStrictEqual({
			cancelled: true,
			options: {
				...emptyOptions,
			},
		});
	});

	it("returns a cancellation when the repository prompt is cancelled", async () => {
		mockGetPrefillOrPromptedOption
			.mockImplementationOnce(() => "MockOwner")
			.mockImplementation(() => undefined);

		expect(await readOptions([])).toStrictEqual({
			cancelled: true,
			options: {
				...emptyOptions,
				owner: "MockOwner",
			},
		});
	});

	it("returns a cancellation when the description prompt is cancelled", async () => {
		mockGetPrefillOrPromptedOption
			.mockImplementationOnce(() => "MockOwner")
			.mockImplementationOnce(() => "MockRepository")
			.mockImplementation(() => undefined);

		expect(await readOptions([])).toStrictEqual({
			cancelled: true,
			options: {
				...emptyOptions,
				owner: "MockOwner",
				repository: "MockRepository",
			},
		});
	});

	it("returns a cancellation when the title prompt is cancelled", async () => {
		mockGetPrefillOrPromptedOption
			.mockImplementationOnce(() => "MockOwner")
			.mockImplementationOnce(() => "MockRepository")
			.mockImplementationOnce(() => "Mock description.")
			.mockImplementation(() => undefined);

		expect(await readOptions([])).toStrictEqual({
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
		mockGetPrefillOrPromptedOption
			.mockImplementationOnce(() => "MockOwner")
			.mockImplementationOnce(() => "MockRepository")
			.mockImplementationOnce(() => "Mock description.")
			.mockImplementation(() => undefined);

		expect(await readOptions(["--logo", "logo.svg"])).toStrictEqual({
			cancelled: true,
			options: {
				...emptyOptions,
				description: "Mock description.",
				owner: "MockOwner",
				repository: "MockRepository",
			},
		});
	});

	it("returns success options when --base is valid", async () => {
		mockGetPrefillOrPromptedOption.mockImplementation(() => "mock");

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
