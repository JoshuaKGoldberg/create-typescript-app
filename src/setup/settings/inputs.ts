import { parseArgs } from "node:util";

import * as prompts from "@clack/prompts";
import chalk from "chalk";
import { Octokit } from "octokit";
import { titleCase } from "title-case";

import { handlePromptCancel } from "../cli/prompts.js";
import { ensureRepositoryExists } from "../steps/ensureRepositoryExists.js";
import { getDefaultSettings } from "./defaults.js";
import { getOctokit } from "./octokit.js";

type StringInputValues = {
	[K in keyof InputValues as InputValues[K] extends string
		? K
		: never]: InputValues[K];
};

export interface InputValues {
	description: string;
	owner: string;
	repository: string;
	skipApi: boolean;
	skipRestore: boolean;
	skipUninstalls: boolean;
	title: string;
}

interface InputValuesAndOctokit {
	octokit: Octokit | undefined;
	values: InputValues;
}

export async function getInputValuesAndOctokit(
	args: string[]
): Promise<InputValuesAndOctokit> {
	const { defaultOwner, defaultRepository } = await getDefaultSettings();
	const { values } = parseArgs({
		args,
		options: {
			description: { type: "string" },
			owner: { type: "string" },
			repository: { type: "string" },
			title: { type: "string" },
			"skip-api": { type: "boolean" },
			"skip-restore": { type: "boolean" },
			"skip-uninstalls": { type: "boolean" },
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
			description,
			owner,
			repository,
			skipApi: !!values["skip-api"],
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
			console.log(chalk.gray(`│  Pre-filling ${key} to ${existing}.`));
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
