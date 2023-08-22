import * as prompts from "@clack/prompts";
import chalk from "chalk";

import { handlePromptCancel } from "../shared/prompts.js";

export type Mode = "create" | "initialize" | "migrate";

const allowedModes = ["create", "initialize", "migrate"] satisfies Mode[];

function isMode(input: boolean | string): input is Mode {
	return allowedModes.includes(input as Mode);
}

export async function promptForMode(
	input: boolean | string | undefined,
): Promise<Error | Mode> {
	if (input) {
		if (!isMode(input)) {
			return new Error(
				`Unknown --mode: ${input}. Allowed modes are: ${allowedModes.join(
					", ",
				)}.`,
			);
		}

		return input;
	}

	const selection = (await prompts.select({
		message: chalk.blue("How would you like to use the template?"),
		options: [
			{
				label:
					"--create a new repository in a child directory using the template",
				value: "create",
			},
			{
				label:
					"--initialize a repository in the current directory freshly forked from the GitHub template",
				value: "initialize",
			},
			{
				label:
					"--migrate an existing repository in the current directory to use the template's tooling",
				value: "migrate",
			},
		],
	})) as Mode;

	handlePromptCancel(selection);

	return selection;
}
