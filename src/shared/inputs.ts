import { parseArgs } from "node:util";
import { Octokit } from "octokit";
import { titleCase } from "title-case";

import { allArgOptions } from "./args.js";
import { runOrSkip } from "./cli/runOrSkip.js";
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
	funding: string | undefined;
	owner: string | undefined;
	releases: boolean | undefined;
	repository: string;
	skipApi: boolean;
	skipContributors: boolean | undefined;
	skipInstall: boolean | undefined;
	skipRemoval: boolean | undefined;
	skipRestore: boolean | undefined;
	skipUninstall: boolean | undefined;
	title: string;
	unitTests: boolean | undefined;
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
		await runOrSkip(
			"Checking GitHub authentication",
			!!values["skip-github-api"],
			getOctokit,
		),
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
			funding: await optionalDefault(
				values.funding as string | undefined,
				defaults.funding,
			),
			owner,
			releases: await optionalDefault(
				values.releases as boolean | undefined,
				defaults.releases,
			),
			repository: repository,
			skipApi: !!values["skip-github-api"],
			skipContributors: !!values["skip-contributors"],
			skipInstall: !!values["skip-install"],
			skipRemoval: !!values["skip-removal"],
			skipRestore: values["skip-restore"] as boolean | undefined,
			skipUninstall: !!values["skip-uninstall"],
			title: title,
			unitTests: await optionalDefault(
				values.unitTests as boolean | undefined,
				defaults.unitTests,
			),
		},
	};
}
