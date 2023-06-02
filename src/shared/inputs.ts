import { parseArgs } from "node:util";

import * as prompts from "@clack/prompts";
import chalk from "chalk";
import { Octokit } from "octokit";
import { titleCase } from "title-case";

import { logLine } from "./cli/lines.js";
import { getDefaultSettings } from "./defaults.js";
import { ensureRepositoryExists } from "./ensureRepositoryExists.js";
import { getOctokit } from "./getOctokit.js";
import { optionalDefault } from "./optionalDefault.js";
import { handlePromptCancel } from "./prompts.js";

export type GetterDefaultInputValues = {
	[K in keyof DefaultInputValues]:
		| DefaultInputValues[K]
		| (() => Promise<DefaultInputValues[K]>);
};

type StringInputValues = {
	[K in keyof InputValues as InputValues[K] extends string
		? K
		: never]: InputValues[K];
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
	let shouldLogLineBeforePrefill = true;

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
			unitTests: { type: "boolean" },
			title: { type: "string" },
			"skip-api": { type: "boolean" },
			"skip-removal": { type: "boolean" },
			"skip-restore": { type: "boolean" },
			"skip-uninstall": { type: "boolean" },
		},
		tokens: true,
		strict: false,
	});

	const owner = await getPrefillOrPromptedValue(
		"owner",
		"What owner or user will the repository be under?",
		defaultOwner
	);

	const octokit = await getOctokit(!!values["skip-api"]);

	shouldLogLineBeforePrefill = true;

	const repository = await ensureRepositoryExists(
		octokit,
		owner,
		await getPrefillOrPromptedValue(
			"repository",
			"What will the kebab-case name of the repository be?",
			defaultRepository
		)
	);

	const title = await getPrefillOrPromptedValue(
		"title",
		"What will the Title Case title of the repository be?",
		titleCase(repository).replaceAll("-", " ")
	);

	const description = await getPrefillOrPromptedValue(
		"description",
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
			email: await optionalDefault(
				values.email as string | undefined,
				defaults.email
			),
			funding: await optionalDefault(
				values.funding as string | undefined,
				defaults.funding
			),
			releases: await optionalDefault(
				values.releases as boolean | undefined,
				defaults.releases
			),
			unitTests: await optionalDefault(
				values.unitTests as boolean | undefined,
				defaults.unitTests
			),
			description,
			owner,
			repository,
			skipApi: !!values["skip-api"],
			skipRemoval: !!values["skip-removal"],
			skipRestore: !!values["skip-restore"],
			skipUninstalls: !!values["skip-uninstalls"],
			title,
		},
	};

	async function getPrefillOrPromptedValue<Key extends keyof StringInputValues>(
		key: Key,
		message: string,
		placeholder: string
	): Promise<StringInputValues[Key]> {
		const existing = values[key] as string | undefined;
		if (existing) {
			if (shouldLogLineBeforePrefill) {
				logLine();
				shouldLogLineBeforePrefill = false;
			}

			logLine(chalk.gray(`Pre-filling ${key} to ${existing}.`));
			return existing;
		}

		const value = await prompts.text({
			message,
			placeholder,
			validate: (val) => {
				if (val.length === 0) {
					return "Please enter a value.";
				}
			},
		});

		handlePromptCancel(value);

		return value;
	}
}
