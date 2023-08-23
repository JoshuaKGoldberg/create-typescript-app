import { parseArgs } from "node:util";
import { Octokit } from "octokit";
import { titleCase } from "title-case";

import { allArgOptions } from "./args.js";
import { withSpinner } from "./cli/spinners.js";
import { ensureRepositoryExists } from "./ensureRepositoryExists.js";
import { getOctokit } from "./getOctokit.js";
import { getPrefillOrPromptedValue } from "./getPrefillOrPromptedValue.js";
import { optionalDefault } from "./optionalDefault.js";

export type GetterDefaultInputValues = {
	[K in keyof DefaultInputValues]:
		| (() => Promise<DefaultInputValues[K]>)
		| DefaultInputValues[K];
};

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
	excludeLintPackage: boolean | undefined;
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

export interface InputValuesOverrides {
	owner?: () => Promise<string> | string;
	repository?: () => Promise<string> | string;
}

export interface InputValuesAndOctokitSettings {
	args: string[];
	defaults?: Partial<GetterDefaultInputValues>;
	overrides?: InputValuesOverrides;
}

export async function readInputs({
	args,
	defaults = {},
	overrides = {},
}: InputValuesAndOctokitSettings): Promise<HelpersAndValues> {
	const { values } = parseArgs({
		args,
		options: allArgOptions,
		strict: false,
		tokens: true,
	});
	const owner =
		(values.owner as string | undefined) ??
		(await (overrides.owner?.() ??
			(await getPrefillOrPromptedValue(
				values.owner as string | undefined,
				"What organization or user will the repository be under?",
			))));

	const { octokit, repository } = await ensureRepositoryExists(
		values["skip-github-api"]
			? undefined
			: await withSpinner("Checking GitHub authentication", getOctokit),
		{
			createRepository: values["create-repository"] as boolean | undefined,
			owner,
			repository:
				(values.repository as string | undefined) ??
				(await overrides.repository?.()) ??
				(await getPrefillOrPromptedValue(
					undefined,
					"What will the kebab-case name of the repository be?",
				)),
		},
	);

	const title = await getPrefillOrPromptedValue(
		values.title as string | undefined,
		"What will the Title Case title of the repository be?",
		titleCase(repository).replaceAll("-", " "),
	);

	const description = await getPrefillOrPromptedValue(
		values.description as string | undefined,
		"How would you describe the new package?",
		"A very lovely package. Hooray!",
	);

	return {
		octokit,
		values: {
			author: await optionalDefault(
				values.author as string | undefined,
				defaults.author,
			),
			createRepository: await optionalDefault(
				values["create-repository"] as boolean | undefined,
				defaults.createRepository,
			),
			description,
			email: await optionalDefault(
				values.email as string | undefined,
				defaults.email,
			),
			excludeCompliance: await optionalDefault(
				values["exclude-compliance"] as boolean | undefined,
				defaults.excludeCompliance,
			),
			excludeContributors: await optionalDefault(
				values["exclude-contributors"] as boolean | undefined,
				defaults.excludeContributors,
			),
			excludeLintJson: await optionalDefault(
				values["exclude-lint-json"] as boolean | undefined,
				defaults.excludeLintJson,
			),
			excludeLintKnip: await optionalDefault(
				values["exclude-lint-knip"] as boolean | undefined,
				defaults.excludeLintKnip,
			),
			excludeLintMd: await optionalDefault(
				values["exclude-lint-md"] as boolean | undefined,
				defaults.excludeLintMd,
			),
			excludeLintPackage: await optionalDefault(
				values["exclude-lint-package"] as boolean | undefined,
				defaults.excludeLintPackage,
			),
			excludeLintPackages: await optionalDefault(
				values["exclude-lint-packages"] as boolean | undefined,
				defaults.excludeLintPackages,
			),
			excludeLintPerfectionist: await optionalDefault(
				values["exclude-lint-perfectionist"] as boolean | undefined,
				defaults.excludeLintPerfectionist,
			),
			excludeLintSpelling: await optionalDefault(
				values["exclude-lint-spelling"] as boolean | undefined,
				defaults.excludeLintSpelling,
			),
			excludeLintYml: await optionalDefault(
				values["exclude-lint-yml"] as boolean | undefined,
				defaults.excludeLintYml,
			),
			excludeReleases: await optionalDefault(
				values["exclude-releases"] as boolean | undefined,
				defaults.excludeReleases,
			),
			excludeRenovate: await optionalDefault(
				values["exclude-renovate"] as boolean | undefined,
				defaults.excludeRenovate,
			),
			excludeTests: await optionalDefault(
				values["unit-tests"] as boolean | undefined,
				defaults.excludeTests,
			),
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
			title,
		},
	};
}
