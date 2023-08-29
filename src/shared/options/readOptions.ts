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
import { optionalDefault } from "./optionalDefault.js";
import { getGitAndNpmDefaults } from "./readGitAndNpmDefaults/index.js";

export interface OctokitAndOptions {
	octokit: Octokit | undefined;
	options: Options;
}

export async function readOptions(args: string[]): Promise<OctokitAndOptions> {
	const defaults = await getGitAndNpmDefaults();
	const { values } = parseArgs({
		args,
		options: allArgOptions,
		strict: false,
		tokens: true,
	});

	const owner = await getPrefillOrPromptedOption(
		values.owner as string | undefined,
		"What organization or user will the repository be under?",
		defaults.owner,
	);

	const { octokit, repository } = await ensureRepositoryExists(
		values["skip-github-api"]
			? undefined
			: await withSpinner("Checking GitHub authentication", getOctokit),
		{
			createRepository: values["create-repository"] as boolean | undefined,
			owner,
			repository: await getPrefillOrPromptedOption(
				values.repository as string | undefined,
				"What will the kebab-case name of the repository be?",
				defaults.repository,
			),
		},
	);

	return {
		octokit,
		options: await augmentOptionsWithExcludes({
			author:
				(values.author as string | undefined) ??
				defaults.author ??
				owner.toLowerCase(),
			base: values.base as InputBase,
			createRepository: values["create-repository"] as boolean | undefined,
			description: await getPrefillOrPromptedOption(
				values.description as string | undefined,
				"How would you describe the new package?",
				defaults.description ?? "A very lovely package. Hooray!",
			),
			email: (values.email as string | undefined) ?? defaults.email,
			excludeCompliance: values["exclude-compliance"] as boolean | undefined,
			excludeContributors: values["exclude-contributors"] as
				| boolean
				| undefined,
			excludeLintJson: values["exclude-lint-json"] as boolean | undefined,
			excludeLintKnip: values["exclude-lint-knip"] as boolean | undefined,
			excludeLintMd: values["exclude-lint-md"] as boolean | undefined,
			excludeLintPackageJson: values["exclude-lint-package-json"] as
				| boolean
				| undefined,
			excludeLintPackages: values["exclude-lint-packages"] as
				| boolean
				| undefined,
			excludeLintPerfectionist: values["exclude-lint-perfectionist"] as
				| boolean
				| undefined,
			excludeLintSpelling: values["exclude-lint-spelling"] as
				| boolean
				| undefined,
			excludeLintYml: values["exclude-lint-yml"] as boolean | undefined,
			excludeReleases: values["exclude-releases"] as boolean | undefined,
			excludeRenovate: values["exclude-renovate"] as boolean | undefined,
			excludeTests: values["unit-tests"] as boolean | undefined,
			funding: await optionalDefault(
				values.funding as string | undefined,
				defaults.funding,
			),
			owner,
			repository: repository,
			skipGitHubApi: !!values["skip-github-api"],
			skipInstall: !!values["skip-install"],
			skipRemoval: !!values["skip-removal"],
			skipRestore: values["skip-restore"] as boolean | undefined,
			skipUninstall: !!values["skip-uninstall"],
			title: await getPrefillOrPromptedOption(
				values.title as string | undefined,
				"What will the Title Case title of the repository be?",
				defaults.title ?? titleCase(repository).replaceAll("-", " "),
			),
		}),
	};
}
