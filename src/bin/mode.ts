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

	const selection = handlePromptCancel(
		(await prompts.select({
			message: chalk.blue("How would you like to use the template?"),
			options: [
				{
					label: "--create a new repository in a child directory",
					value: "create",
				},
				{
					label: "--initialize a freshly repository in the current directory",
					value: "initialize",
				},
				{
					label: "--migrate an existing repository in the current directory",
					value: "migrate",
				},
			],
		})) as Mode | symbol,
	);

	return selection;
}
