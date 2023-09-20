import { parseArgs } from "node:util";
import { titleCase } from "title-case";
import { z } from "zod";

import { withSpinner } from "../cli/spinners.js";
import { Options } from "../types.js";
import { allArgOptions } from "./args.js";
import { augmentOptionsWithExcludes } from "./augmentOptionsWithExcludes.js";
import { ensureRepositoryExists } from "./ensureRepositoryExists.js";
import { GitHub, getGitHub } from "./getGitHub.js";
import { getPrefillOrPromptedOption } from "./getPrefillOrPromptedOption.js";
import { getGitAndNpmDefaults } from "./readGitAndNpmDefaults/index.js";

export interface GitHubAndOptions {
	github: GitHub | undefined;
	options: Options;
}

export interface OptionsParseCancelled {
	cancelled: true;
	options: object;
	zodError?: z.ZodError<object>;
}

export interface OptionsParseSuccess extends GitHubAndOptions {
	cancelled: false;
}

export type OptionsParseResult = OptionsParseCancelled | OptionsParseSuccess;

export async function readOptions(args: string[]): Promise<OptionsParseResult> {
	const defaults = getGitAndNpmDefaults();
	const { values } = parseArgs({
		args,
		options: allArgOptions,
		strict: false,
		tokens: true,
	});

	const mappedOptions = {
		author: values.author,
		base: values.base,
		createRepository: values["create-repository"],
		description: values.description,
		email: values.email,
		excludeCompliance: values["exclude-compliance"],
		excludeContributors: values["exclude-contributors"],
		excludeLintJson: values["exclude-lint-json"],
		excludeLintKnip: values["exclude-lint-knip"],
		excludeLintMd: values["exclude-lint-md"],
		excludeLintPackageJson: values["exclude-lint-package-json"],
		excludeLintPackages: values["exclude-lint-packages"],
		excludeLintPerfectionist: values["exclude-lint-perfectionist"],
		excludeLintSpelling: values["exclude-lint-spelling"],
		excludeLintYml: values["exclude-lint-yml"],
		excludeReleases: values["exclude-releases"],
		excludeRenovate: values["exclude-renovate"],
		excludeTests: values["unit-tests"],
		funding: values.funding,
		owner: values.owner,
		repository: values.repository,
		skipGitHubApi: !!values["skip-github-api"],
		skipInstall: !!values["skip-install"],
		skipRemoval: !!values["skip-removal"],
		skipRestore: values["skip-restore"],
		skipUninstall: !!values["skip-uninstall"],
		title: values.title,
	};

	const optionsParseResult = optionsSchema.safeParse(mappedOptions);

	if (!optionsParseResult.success) {
		return {
			cancelled: true,
			options: mappedOptions,
			zodError: optionsParseResult.error,
		};
	}

	const options = optionsParseResult.data;

	options.owner ??= await getPrefillOrPromptedOption(
		options.owner,
		"What organization or user will the repository be under?",
		defaults.owner,
	);
	if (!options.owner) {
		return {
			cancelled: true,
			options,
		};
	}

	options.repository ??= await getPrefillOrPromptedOption(
		options.repository,
		"What will the kebab-case name of the repository be?",
		defaults.repository,
	);
	if (!options.repository) {
		return {
			cancelled: true,
			options,
		};
	}

	const { github, repository } = await ensureRepositoryExists(
		values["skip-github-api"]
			? undefined
			: await withSpinner("Checking GitHub authentication", getGitHub),
		{
			createRepository: options.createRepository,
			owner: options.owner,
			repository: options.repository,
		},
	);
	if (!repository) {
		return { cancelled: true, options };
	}

	options.description ??= await getPrefillOrPromptedOption(
		options.description,
		"How would you describe the new package?",
		async () =>
			(await defaults.description()) ?? "A very lovely package. Hooray!",
	);
	if (!options.description) {
		return { cancelled: true, options };
	}

	options.title ??= await getPrefillOrPromptedOption(
		options.title,
		"What will the Title Case title of the repository be?",
		async () =>
			(await defaults.title()) ?? titleCase(repository).replaceAll("-", " "),
	);
	if (!options.title) {
		return { cancelled: true, options };
	}

	const augmentedOptions = await augmentOptionsWithExcludes({
		...options,
		author: options.author ?? (await defaults.owner()),
		description: options.description,
		email: options.email ?? (await defaults.email()),
		funding: options.funding ?? (await defaults.funding()),
		owner: options.owner,
		repository,
		title: options.title,
	});

	if (!augmentedOptions) {
		return {
			cancelled: true,
			options,
		};
	}

	return {
		cancelled: false,
		github,
		options: augmentedOptions,
	};
}

const optionsSchema = z.object({
	author: z.string().optional(),
	base: z
		.union([
			z.literal("common"),
			z.literal("everything"),
			z.literal("minimum"),
			z.literal("prompt"),
		])
		.optional(),
	createRepository: z.boolean().optional(),
	description: z.string().optional(),
	email: z.string().email().optional(),
	excludeCompliance: z.boolean().optional(),
	excludeContributors: z.boolean().optional(),
	excludeLintJson: z.boolean().optional(),
	excludeLintKnip: z.boolean().optional(),
	excludeLintMd: z.boolean().optional(),
	excludeLintPackageJson: z.boolean().optional(),
	excludeLintPackages: z.boolean().optional(),
	excludeLintPerfectionist: z.boolean().optional(),
	excludeLintSpelling: z.boolean().optional(),
	excludeLintYml: z.boolean().optional(),
	excludeReleases: z.boolean().optional(),
	excludeRenovate: z.boolean().optional(),
	excludeTests: z.boolean().optional(),
	funding: z.string().optional(),
	owner: z.string().optional(),
	repository: z.string().optional(),
	skipGitHubApi: z.boolean(),
	skipInstall: z.boolean(),
	skipRemoval: z.boolean(),
	skipRestore: z.boolean().optional(),
	skipUninstall: z.boolean(),
	title: z.string().optional(),
});
