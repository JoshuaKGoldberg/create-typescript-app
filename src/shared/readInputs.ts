import { parseArgs } from "node:util";
import { Octokit } from "octokit";
import { titleCase } from "title-case";

import { allArgOptions } from "./args.js";
import { augmentValuesWithExcludes } from "./augmentValuesWithExcludes.js";
import { withSpinner } from "./cli/spinners.js";
import { ensureRepositoryExists } from "./ensureRepositoryExists.js";
import { getOctokit } from "./getOctokit.js";
import { getPrefillOrPromptedValue } from "./getPrefillOrPromptedValue.js";
import { optionalDefault } from "./optionalDefault.js";
import { getGitAndNpmDefaults } from "./readGitAndNpmDefaults/index.js";

export interface DefaultInputValues {
	author: string | undefined;
	createRepository: boolean | undefined;
	description: string;
	email: string | undefined;
	excludeCompliance: boolean | undefined;
	excludeContributors: boolean | undefined;
	excludeLintJson: boolean | undefined;
	excludeLintKnip: boolean | undefined;
	excludeLintMd: boolean | undefined;
	excludeLintPackageJson: boolean | undefined;
	excludeLintPackages: boolean | undefined;
	excludeLintPerfectionist: boolean | undefined;
	excludeLintSpelling: boolean | undefined;
	excludeLintYml: boolean | undefined;
	excludeReleases: boolean | undefined;
	excludeRenovate: boolean | undefined;
	excludeTests: boolean | undefined;
	funding: string | undefined;
	owner: string | undefined;
	repository: string;
	skipApi: boolean;
	skipInstall: boolean | undefined;
	skipRemoval: boolean | undefined;
	skipRestore: boolean | undefined;
	skipUninstall: boolean | undefined;
	title: string;
}

export interface InputValues extends DefaultInputValues {
	owner: string;
}

export interface HelpersAndValues {
	octokit: Octokit | undefined;
	values: InputValues;
}

export async function readInputs(args: string[]): Promise<HelpersAndValues> {
	const defaults = await getGitAndNpmDefaults();
	const { values } = parseArgs({
		args,
		options: allArgOptions,
		strict: false,
		tokens: true,
	});

	const owner = await getPrefillOrPromptedValue(
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
			repository: await getPrefillOrPromptedValue(
				values.repository as string | undefined,
				"What will the kebab-case name of the repository be?",
				defaults.repository,
			),
		},
	);

	const authorDefault =
		(values.author as string | undefined) ??
		defaults.author ??
		owner.toLowerCase();

	return {
		octokit,
		values: await augmentValuesWithExcludes({
			author: await getPrefillOrPromptedValue(
				values["exclude-releases"]
					? authorDefault
					: (values.author as string | undefined),
				"What author (username) will be used for the npm owner?",
				authorDefault,
			),
			createRepository: values["create-repository"] as boolean | undefined,
			description: await getPrefillOrPromptedValue(
				values.description as string | undefined,
				"How would you describe the new package?",
				defaults.description ?? "A very lovely package. Hooray!",
			),
			email: await getPrefillOrPromptedValue(
				values.email as string | undefined,
				"What email will be used for contact information?",
				defaults.email,
			),
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
			skipApi: !!values["skip-github-api"],
			skipInstall: !!values["skip-install"],
			skipRemoval: !!values["skip-removal"],
			skipRestore: values["skip-restore"] as boolean | undefined,
			skipUninstall: !!values["skip-uninstall"],
			title: await getPrefillOrPromptedValue(
				values.title as string | undefined,
				"What will the Title Case title of the repository be?",
				defaults.title ?? titleCase(repository).replaceAll("-", " "),
			),
		}),
	};
}
