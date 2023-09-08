import { parseArgs } from "node:util";
import { Octokit } from "octokit";
import { titleCase } from "title-case";

import { withSpinner } from "../cli/spinners.js";
import { InputBase, Options } from "../types.js";
import { allArgOptions } from "./args.js";
import { augmentOptionsWithExcludes } from "./augmentOptionsWithExcludes.js";
import { ensureRepositoryExists } from "./ensureRepositoryExists.js";
import { getOctokit } from "./getOctokit.js";
import { getPrefillOrPromptedOption } from "./getPrefillOrPromptedOption.js";
import { readOptionDefaults } from "./readOptionDefaults/index.js";

export interface OctokitAndOptions {
	octokit: Octokit | undefined;
	options: Options;
}

export interface OptionsParseCancelled {
	cancelled: true;
	options: Partial<Options>;
}

export interface OptionsParseSuccess extends OctokitAndOptions {
	cancelled: false;
}

export type OptionsParseResult = OptionsParseCancelled | OptionsParseSuccess;

export async function readOptions(args: string[]): Promise<OptionsParseResult> {
	const defaults = await readOptionDefaults();
	const { values } = parseArgs({
		args,
		options: allArgOptions,
		strict: false,
		tokens: true,
	});

	const options = {
		author: values.author as string | undefined,
		base: values.base as InputBase,
		createRepository: values["create-repository"] as boolean | undefined,
		description: values.description as string | undefined,
		email: values.email as string | undefined,
		excludeCompliance: values["exclude-compliance"] as boolean | undefined,
		excludeContributors: values["exclude-contributors"] as boolean | undefined,
		excludeLintJson: values["exclude-lint-json"] as boolean | undefined,
		excludeLintKnip: values["exclude-lint-knip"] as boolean | undefined,
		excludeLintMd: values["exclude-lint-md"] as boolean | undefined,
		excludeLintPackageJson: values["exclude-lint-package-json"] as
			| boolean
			| undefined,
		excludeLintPackages: values["exclude-lint-packages"] as boolean | undefined,
		excludeLintPerfectionist: values["exclude-lint-perfectionist"] as
			| boolean
			| undefined,
		excludeLintSpelling: values["exclude-lint-spelling"] as boolean | undefined,
		excludeLintYml: values["exclude-lint-yml"] as boolean | undefined,
		excludeReleases: values["exclude-releases"] as boolean | undefined,
		excludeRenovate: values["exclude-renovate"] as boolean | undefined,
		excludeTests: values["unit-tests"] as boolean | undefined,
		funding: values.funding as string | undefined,
		owner: values.owner as string | undefined,
		repository: values.repository as string | undefined,
		skipGitHubApi: !!values["skip-github-api"],
		skipInstall: !!values["skip-install"],
		skipRemoval: !!values["skip-removal"],
		skipRestore: values["skip-restore"] as boolean | undefined,
		skipUninstall: !!values["skip-uninstall"],
		title: values.title as string | undefined,
	};

	options.owner ??= await getPrefillOrPromptedOption(
		values.owner as string | undefined,
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

	const { octokit, repository } = await ensureRepositoryExists(
		values["skip-github-api"]
			? undefined
			: await withSpinner("Checking GitHub authentication", getOctokit),
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
		defaults.description ?? "A very lovely package. Hooray!",
	);
	if (!options.description) {
		return { cancelled: true, options };
	}

	options.title ??= await getPrefillOrPromptedOption(
		options.title,
		"What will the Title Case title of the repository be?",
		defaults.title ?? titleCase(repository).replaceAll("-", " "),
	);
	if (!options.title) {
		return { cancelled: true, options };
	}

	const augmentedOptions = await augmentOptionsWithExcludes({
		...options,
		author: options.author ?? defaults.owner,
		email: options.email ?? defaults.email,
		funding: options.funding ?? defaults.funding,
		logo: values.logo
			? {
					alt: await getPrefillOrPromptedOption(
						values["logoAlt"] as string | undefined,
						"What is the alt text (non-visual description) of the logo?",
					),
					src: values.logo as string | undefined,
			  }
			: undefined,
		repository,
	} as Options);

	if (!augmentedOptions) {
		return {
			cancelled: true,
			options,
		};
	}

	return {
		cancelled: false,
		octokit,
		options: augmentedOptions,
	};
}
