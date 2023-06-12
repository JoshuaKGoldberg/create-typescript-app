import { parseArgs } from "node:util";
import { Octokit } from "octokit";
import { titleCase } from "title-case";

import { PrefillPrompter } from "./PrefillPrompter.js";
import { getDefaultSettings } from "./defaults.js";
import { ensureRepositoryExists } from "./ensureRepositoryExists.js";
import { getOctokit } from "./getOctokit.js";
import { optionalDefault } from "./optionalDefault.js";

export type GetterDefaultInputValues = {
	[K in keyof DefaultInputValues]:
		| (() => Promise<DefaultInputValues[K]>)
		| DefaultInputValues[K];
};

export interface DefaultInputValues {
	author: string | undefined;
	description: string;
	email: string | undefined;
	funding: string | undefined;
	owner: string | undefined;
	releases: boolean | undefined;
	repository: string;
	skipApi: boolean;
	skipRemoval: boolean;
	skipRestore: boolean;
	skipUninstalls: boolean;
	title: string;
	unitTests: boolean | undefined;
}

export interface InputValues extends DefaultInputValues {
	owner: string;
}

export interface InputValuesAndOctokit {
	octokit: Octokit | undefined;
	values: InputValues;
}

export async function getInputValuesAndOctokit(
	args: string[],
	defaults: Partial<GetterDefaultInputValues> = {}
): Promise<InputValuesAndOctokit> {
	const { defaultOwner, defaultRepository } = await getDefaultSettings();
	const { values } = parseArgs({
		args,
		options: {
			author: { type: "string" },
			description: { type: "string" },
			email: { type: "string" },
			funding: { type: "string" },
			owner: { type: "string" },
			releases: { type: "boolean" },
			repository: { type: "string" },
			"skip-api": { type: "boolean" },
			"skip-removal": { type: "boolean" },
			"skip-restore": { type: "boolean" },
			"skip-uninstall": { type: "boolean" },
			title: { type: "string" },
			unitTests: { type: "boolean" },
		},
		strict: false,
		tokens: true,
	});
	const prompter = new PrefillPrompter();

	const owner = await prompter.getPrefillOrPromptedValue(
		"owner",
		values.owner as string | undefined,
		"What owner or user will the repository be under?",
		defaultOwner
	);

	const octokit = await getOctokit(!!values["skip-api"]);

	prompter.reset();

	const repository = await ensureRepositoryExists(
		octokit,
		owner,
		await prompter.getPrefillOrPromptedValue(
			"repository",
			values.repository as string | undefined,
			"What will the kebab-case name of the repository be?",
			defaultRepository
		)
	);

	const title = await prompter.getPrefillOrPromptedValue(
		"title",
		values.title as string | undefined,
		"What will the Title Case title of the repository be?",
		titleCase(repository).replaceAll("-", " ")
	);

	const description = await prompter.getPrefillOrPromptedValue(
		"description",
		values.description as string | undefined,
		"How would you describe the new package?",
		"A very lovely package. Hooray!"
	);

	return {
		octokit,
		values: {
			author: await optionalDefault(
				values.author as string | undefined,
				defaults.author
			),
			description,
			email: await optionalDefault(
				values.email as string | undefined,
				defaults.email
			),
			funding: await optionalDefault(
				values.funding as string | undefined,
				defaults.funding
			),
			owner,
			releases: await optionalDefault(
				values.releases as boolean | undefined,
				defaults.releases
			),
			repository,
			skipApi: !!values["skip-api"],
			skipRemoval: !!values["skip-removal"],
			skipRestore: !!values["skip-restore"],
			skipUninstalls: !!values["skip-uninstalls"],
			title,
			unitTests: await optionalDefault(
				values.unitTests as boolean | undefined,
				defaults.unitTests
			),
		},
	};
}
