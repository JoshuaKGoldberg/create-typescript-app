import * as prompts from "@clack/prompts";
import chalk from "chalk";

import { StatusCode } from "../shared/codes.js";
import { filterPromptCancel } from "../shared/prompts.js";
import { Options } from "../shared/types.js";

export interface ModeResult {
	code: StatusCode;
	options: Partial<Options>;
}

export type ModeRunner = (args: string[]) => Promise<ModeResult>;

export type Mode = "create" | "initialize" | "migrate";

const allowedModes = ["create", "initialize", "migrate"] satisfies Mode[];

function isMode(input: boolean | string): input is Mode {
	return allowedModes.includes(input as Mode);
}

export async function promptForMode(input: boolean | string | undefined) {
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

	const label = (base: string, text: string) => `${chalk.bold(base)} ${text}`;

	const selection = filterPromptCancel(
		(await prompts.select({
			message: chalk.blue("How would you like to use the template?"),
			options: [
				{
					label: label("create", "a new repository in a child directory"),
					value: "create",
				},
				{
					label: label(
						"initialize",
						"a freshly repository in the current directory",
					),
					value: "initialize",
				},
				{
					label: label(
						"migrate",
						"an existing repository in the current directory",
					),
					value: "migrate",
				},
			],
		})) as Mode | symbol,
	);

	return selection;
}
