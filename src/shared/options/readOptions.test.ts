import { describe, expect, it, vi } from "vitest";
import z from "zod";

import { Options } from "../types.js";
import { GetPrefillOrPromptedOptionOptions } from "./getPrefillOrPromptedOption.js";
import { optionsSchemaShape } from "./optionsSchema.js";
import { readOptions } from "./readOptions.js";

const emptyOptions = {
	access: undefined,
	author: undefined,
	auto: false,
	base: undefined,
	bin: undefined,
	description: undefined,
	directory: undefined,
	email: undefined,
	excludeAllContributors: undefined,
	excludeCompliance: undefined,
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
	guide: undefined,
	guideTitle: undefined,
	logo: undefined,
	logoAlt: undefined,
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

const mockReadPackageData = vi.fn();

vi.mock("../packages.js", () => ({
	get readPackageData() {
		return mockReadPackageData;
	},
}));

const mockAugmentOptionsWithExcludes = vi.fn();

vi.mock("./augmentOptionsWithExcludes.js", () => ({
	get augmentOptionsWithExcludes() {
		return mockAugmentOptionsWithExcludes;
	},
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

vi.mock("./createOptionDefaults/index.js", () => ({
	createOptionDefaults() {
		return {
			author: vi.fn(),
			bin: vi.fn(),
			description: vi.fn(),
			email: vi.fn(),
			funding: vi.fn(),
			guide: vi.fn(),
			logo: vi.fn(),
			owner: vi.fn(),
			repository: vi.fn(),
			title: vi.fn(),
		};
	},
}));

const mockLogInferredOptions = vi.fn();

vi.mock("./logInferredOptions.js", () => ({
	get logInferredOptions() {
		return mockLogInferredOptions;
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
		mockGetPrefillOrPromptedOption.mockImplementation(() => ({
			value: undefined,
		}));

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
		mockGetPrefillOrPromptedOption.mockImplementation(() => ({
			value: undefined,
		}));

		expect(await readOptions([], "create")).toStrictEqual({
			cancelled: true,
			error: undefined,
			options: {
				...emptyOptions,
			},
		});
	});

	it("returns a cancellation when the repository prompt is cancelled", async () => {
		mockDetectEmailRedundancy.mockReturnValue(false);
		mockGetPrefillOrPromptedOption
			.mockImplementationOnce(() => ({ value: "MockOwner" }))
			.mockImplementation(() => ({ value: undefined }));

		expect(await readOptions([], "create")).toStrictEqual({
			cancelled: true,
			error: undefined,
			options: {
				...emptyOptions,
				owner: "MockOwner",
			},
		});
	});

	it("returns a cancellation when ensureRepositoryPrompt does not return a repository", async () => {
		mockDetectEmailRedundancy.mockReturnValue(false);
		mockGetPrefillOrPromptedOption
			.mockImplementationOnce(() => ({ value: "MockOwner" }))
			.mockImplementationOnce(() => ({ value: "MockRepository" }))
			.mockImplementation(() => ({ value: undefined }));
		mockEnsureRepositoryExists.mockResolvedValue({});

		expect(await readOptions([], "create")).toStrictEqual({
			cancelled: true,
			error: undefined,
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
			.mockImplementationOnce(() => ({ value: "MockOwner" }))
			.mockImplementationOnce(() => ({ value: "MockRepository" }))
			.mockImplementation(() => ({ value: undefined }));
		mockEnsureRepositoryExists.mockResolvedValue({
			github: mockOptions.github,
			repository: mockOptions.repository,
		});

		expect(await readOptions([], "create")).toStrictEqual({
			cancelled: true,
			error: undefined,
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
			.mockImplementationOnce(() => ({ value: "MockOwner" }))
			.mockImplementationOnce(() => ({ value: "MockRepository" }))
			.mockImplementationOnce(() => ({ value: "Mock description." }))
			.mockImplementation(() => ({ value: undefined }));
		mockEnsureRepositoryExists.mockResolvedValue({
			github: mockOptions.github,
			repository: mockOptions.repository,
		});

		expect(await readOptions([], "create")).toStrictEqual({
			cancelled: true,
			error: undefined,
			options: {
				...emptyOptions,
				description: "Mock description.",
				owner: "MockOwner",
				repository: "MockRepository",
			},
		});
	});

	it("returns a cancellation when the guide title prompt is cancelled", async () => {
		mockDetectEmailRedundancy.mockReturnValue(false);
		mockGetPrefillOrPromptedOption
			.mockImplementationOnce(() => ({ value: "MockOwner" }))
			.mockImplementationOnce(() => ({ value: "MockRepository" }))
			.mockImplementationOnce(() => ({ value: "Mock description." }))
			.mockImplementationOnce(() => ({ value: "Mock Title" }))
			.mockImplementation(() => ({ value: undefined }));
		mockEnsureRepositoryExists.mockResolvedValue({
			github: mockOptions.github,
			repository: mockOptions.repository,
		});

		expect(
			await readOptions(["--guide", "https://example.com"], "create"),
		).toStrictEqual({
			cancelled: true,
			error: undefined,
			options: {
				...emptyOptions,
				description: "Mock description.",
				guide: "https://example.com",
				owner: "MockOwner",
				repository: "MockRepository",
				title: "Mock Title",
			},
		});
	});

	it("returns a cancellation when the guide alt prompt is cancelled", async () => {
		mockDetectEmailRedundancy.mockReturnValue(false);
		mockGetPrefillOrPromptedOption
			.mockImplementationOnce(() => ({ value: "MockOwner" }))
			.mockImplementationOnce(() => ({ value: "MockRepository" }))
			.mockImplementationOnce(() => ({ value: "Mock description." }))
			.mockImplementationOnce(() => ({ value: "Mock Title" }))
			.mockImplementation(() => ({ value: undefined }));
		mockEnsureRepositoryExists.mockResolvedValue({
			github: mockOptions.github,
			repository: mockOptions.repository,
		});

		expect(
			await readOptions(["--guide", "https://example.com"], "create"),
		).toStrictEqual({
			cancelled: true,
			error: undefined,
			options: {
				...emptyOptions,
				description: "Mock description.",
				guide: "https://example.com",
				owner: "MockOwner",
				repository: "MockRepository",
				title: "Mock Title",
			},
		});
	});

	it("returns a cancellation when the logo alt prompt is cancelled", async () => {
		mockDetectEmailRedundancy.mockReturnValue(false);
		mockGetPrefillOrPromptedOption
			.mockImplementationOnce(() => ({ value: "MockOwner" }))
			.mockImplementationOnce(() => ({ value: "MockRepository" }))
			.mockImplementationOnce(() => ({ value: "Mock description." }))
			.mockImplementation(() => ({ value: undefined }));
		mockEnsureRepositoryExists.mockResolvedValue({
			github: mockOptions.github,
			repository: mockOptions.repository,
		});

		expect(await readOptions(["--logo", "logo.svg"], "create")).toStrictEqual({
			cancelled: true,
			error: undefined,
			options: {
				...emptyOptions,
				description: "Mock description.",
				logo: "logo.svg",
				owner: "MockOwner",
				repository: "MockRepository",
			},
		});
	});

	it("returns a cancellation when the email prompt is cancelled", async () => {
		mockDetectEmailRedundancy.mockReturnValue(false);
		mockGetPrefillOrPromptedOption
			.mockImplementationOnce(() => ({ value: "MockOwner" }))
			.mockImplementationOnce(() => ({ value: "MockRepository" }))
			.mockImplementationOnce(() => ({ value: "Mock description." }))
			.mockImplementationOnce(() => ({ value: "Mock title." }))
			.mockImplementation(() => ({ value: undefined }));
		mockEnsureRepositoryExists.mockResolvedValue({
			github: mockOptions.github,
			repository: mockOptions.repository,
		});

		expect(await readOptions([], "create")).toStrictEqual({
			cancelled: true,
			error: undefined,
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
			.mockImplementationOnce(() => ({ value: "MockOwner" }))
			.mockImplementationOnce(() => ({ value: "MockRepository" }))
			.mockImplementationOnce(() => ({ value: "Mock description." }))
			.mockImplementationOnce(() => ({ value: "Mock title." }))
			.mockImplementation(() => ({ value: undefined }));
		mockEnsureRepositoryExists.mockResolvedValue({
			github: mockOptions.github,
			repository: mockOptions.repository,
		});
		mockAugmentOptionsWithExcludes.mockResolvedValue(undefined);

		expect(await readOptions([], "create")).toStrictEqual({
			cancelled: true,
			error: undefined,
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
		mockGetPrefillOrPromptedOption.mockImplementation(() => ({
			value: "mock",
		}));
		mockEnsureRepositoryExists.mockResolvedValue({
			github: mockOptions.github,
			repository: mockOptions.repository,
		});

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

	it("returns success options when --base is valid with all optional options", async () => {
		mockAugmentOptionsWithExcludes.mockResolvedValue({
			...emptyOptions,
			...mockOptions,
		});
		mockGetPrefillOrPromptedOption.mockImplementation(() => ({
			value: "mock",
		}));
		mockEnsureRepositoryExists.mockResolvedValue({
			github: mockOptions.github,
			repository: mockOptions.repository,
		});

		expect(
			await readOptions(
				[
					"--base",
					mockOptions.base,
					"--guide",
					"https://example.com",
					"--logo",
					"logo.svg",
				],
				"create",
			),
		).toStrictEqual({
			cancelled: false,
			github: mockOptions.github,
			options: {
				...emptyOptions,
				...mockOptions,
			},
		});
	});

	it("returns cancelled options when augmentOptionsWithExcludes returns undefined", async () => {
		mockAugmentOptionsWithExcludes.mockResolvedValue(undefined);
		mockGetPrefillOrPromptedOption.mockImplementation(() => ({
			value: "mock",
		}));

		expect(
			await readOptions(["--base", mockOptions.base], "create"),
		).toStrictEqual({
			cancelled: true,
			options: {
				...emptyOptions,
				base: mockOptions.base,
				description: "mock",
				owner: "mock",
				repository: "mock",
				title: "mock",
			},
		});
	});

	it("defaults preserveGeneratedFrom to false when the owner is not JoshuaKGoldberg", async () => {
		mockAugmentOptionsWithExcludes.mockImplementationOnce(
			(options: Partial<Options>) => ({
				...options,
				...mockOptions,
			}),
		);
		mockEnsureRepositoryExists.mockResolvedValue({
			github: mockOptions.github,
			repository: mockOptions.repository,
		});
		mockGetPrefillOrPromptedOption.mockImplementation(() => ({
			value: "mock",
		}));

		expect(
			await readOptions(["--base", mockOptions.base], "create"),
		).toStrictEqual({
			cancelled: false,
			github: mockOptions.github,
			options: expect.objectContaining({
				preserveGeneratedFrom: false,
			}),
		});
	});

	it("defaults preserveGeneratedFrom to true when the owner is JoshuaKGoldberg", async () => {
		mockAugmentOptionsWithExcludes.mockImplementationOnce(
			(options: Partial<Options>) => ({
				...options,
				...mockOptions,
			}),
		);
		mockEnsureRepositoryExists.mockResolvedValue({
			github: mockOptions.github,
			repository: mockOptions.repository,
		});
		mockGetPrefillOrPromptedOption.mockImplementation(() => ({
			value: "mock",
		}));

		expect(
			await readOptions(
				["--base", mockOptions.base, "--owner", "JoshuaKGoldberg"],
				"create",
			),
		).toStrictEqual({
			cancelled: false,
			github: mockOptions.github,
			options: expect.objectContaining({
				preserveGeneratedFrom: true,
			}),
		});
	});

	it("skips API calls when --offline is true", async () => {
		mockAugmentOptionsWithExcludes.mockImplementation((options: Options) => ({
			...emptyOptions,
			...mockOptions,
			...options,
		}));
		mockGetPrefillOrPromptedOption.mockImplementation(() => ({
			value: "mock",
		}));
		mockEnsureRepositoryExists.mockResolvedValue({
			github: mockOptions.github,
			repository: mockOptions.repository,
		});

		expect(
			await readOptions(["--base", mockOptions.base, "--offline"], "create"),
		).toStrictEqual({
			cancelled: false,
			github: mockOptions.github,
			options: {
				...emptyOptions,
				...mockOptions,
				access: "public",
				description: "mock",
				directory: "mock",
				email: {
					github: "mock",
					npm: "mock",
				},
				guide: undefined,
				logo: undefined,
				mode: "create",
				offline: true,
				owner: "mock",
				skipAllContributorsApi: true,
				skipGitHubApi: true,
				title: "mock",
			},
		});
	});

	it("infers base from package scripts during migration", async () => {
		mockReadPackageData.mockImplementationOnce(() =>
			Promise.resolve({
				scripts: {
					build: "build",
					lint: "lint",
					test: "test",
				},
			}),
		);
		expect(await readOptions(["--offline"], "migrate")).toStrictEqual({
			cancelled: false,
			github: mockOptions.github,
			options: {
				...emptyOptions,
				...mockOptions,
				access: "public",
				base: "minimal",
				description: "mock",
				directory: "mock",
				email: {
					github: "mock",
					npm: "mock",
				},
				guide: undefined,
				logo: undefined,
				mode: "migrate",
				offline: true,
				owner: "mock",
				skipAllContributorsApi: true,
				skipGitHubApi: true,
				title: "mock",
			},
		});
	});

	it("uses values when provided on the CLI", async () => {
		mockReadPackageData.mockImplementationOnce(() => ({}));
		mockGetPrefillOrPromptedOption.mockImplementation(
			async ({ getDefaultValue }: GetPrefillOrPromptedOptionOptions) => ({
				value: (await getDefaultValue?.()) ?? "mock",
			}),
		);

		const description = "Test description.";
		const owner = "TestOwner";
		const repository = "test-repository";
		const title = "Test Title";

		expect(
			await readOptions(
				[
					"--offline",
					"--description",
					description,
					"--owner",
					owner,
					"--repository",
					repository,
					"--title",
					title,
				],
				"migrate",
			),
		).toStrictEqual({
			cancelled: false,
			github: mockOptions.github,
			options: {
				...emptyOptions,
				...mockOptions,
				access: "public",
				base: "minimal",
				description,
				directory: repository,
				email: {
					github: "mock",
					npm: "mock",
				},
				guide: undefined,
				logo: undefined,
				mode: "migrate",
				offline: true,
				owner,
				skipAllContributorsApi: true,
				skipGitHubApi: true,
				title,
			},
		});

		expect(mockLogInferredOptions).not.toHaveBeenCalled();
	});

	it("uses and logs values when provided on the CLI with auto", async () => {
		mockReadPackageData.mockImplementationOnce(() => ({}));
		mockGetPrefillOrPromptedOption.mockImplementation(
			async ({ getDefaultValue }: GetPrefillOrPromptedOptionOptions) => ({
				value: (await getDefaultValue?.()) ?? "mock",
			}),
		);

		const description = "Test description.";
		const owner = "TestOwner";
		const repository = "test-repository";
		const title = "Test Title";

		expect(
			await readOptions(
				[
					"--auto",
					"--offline",
					"--description",
					description,
					"--owner",
					owner,
					"--repository",
					repository,
					"--title",
					title,
				],
				"migrate",
			),
		).toStrictEqual({
			cancelled: false,
			github: mockOptions.github,
			options: {
				...emptyOptions,
				...mockOptions,
				access: "public",
				auto: true,
				base: "minimal",
				description,
				directory: repository,
				email: {
					github: "mock",
					npm: "mock",
				},
				guide: undefined,
				logo: undefined,
				mode: "migrate",
				offline: true,
				owner,
				skipAllContributorsApi: true,
				skipGitHubApi: true,
				title,
			},
		});

		expect(mockLogInferredOptions.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    {
			      "access": "public",
			      "author": undefined,
			      "auto": true,
			      "base": "minimal",
			      "bin": undefined,
			      "description": "Test description.",
			      "directory": "test-repository",
			      "email": {
			        "github": "mock",
			        "npm": "mock",
			      },
			      "excludeAllContributors": undefined,
			      "excludeCompliance": undefined,
			      "excludeLintESLint": undefined,
			      "excludeLintJSDoc": undefined,
			      "excludeLintJson": undefined,
			      "excludeLintKnip": undefined,
			      "excludeLintMd": undefined,
			      "excludeLintPackageJson": undefined,
			      "excludeLintPackages": undefined,
			      "excludeLintPerfectionist": undefined,
			      "excludeLintRegex": undefined,
			      "excludeLintSpelling": undefined,
			      "excludeLintStrict": undefined,
			      "excludeLintYml": undefined,
			      "excludeReleases": undefined,
			      "excludeRenovate": undefined,
			      "excludeTests": undefined,
			      "funding": undefined,
			      "github": "mock.git",
			      "guide": undefined,
			      "guideTitle": undefined,
			      "logo": undefined,
			      "logoAlt": undefined,
			      "mode": "migrate",
			      "offline": true,
			      "owner": "TestOwner",
			      "preserveGeneratedFrom": false,
			      "repository": "mock.repository",
			      "skipAllContributorsApi": true,
			      "skipGitHubApi": true,
			      "skipInstall": undefined,
			      "skipRemoval": undefined,
			      "skipRestore": undefined,
			      "skipUninstall": undefined,
			      "title": "Test Title",
			    },
			  ],
			]
		`);
	});
});
