import * as prompts from "@clack/prompts";
import chalk from "chalk";
import { $ } from "execa";

import {
	GetterDefaultInputValues,
	InputValuesAndOctokit,
	getInputValuesAndOctokit,
} from "./inputs.js";
import { handlePromptCancel } from "./prompts.js";

export interface RunOrRestoreOptions {
	args: string[];
	defaults?: Partial<GetterDefaultInputValues>;
	label: string;
	run: (inputValuesAndOctokit: InputValuesAndOctokit) => Promise<void>;
}

export async function runOrRestore({
	args,
	defaults,
	label,
	run,
}: RunOrRestoreOptions) {
	console.clear();
	console.log(
		chalk.greenBright`Welcome to the`,
		chalk.bgGreenBright.black`template-typescript-node-package`,
		chalk.greenBright(`package ${label} script! 🎉`)
	);
	console.log();

	let skipRestore = false;

	try {
		prompts.intro(
			chalk.blue(
				"Let's collect some information to fill out repository details..."
			)
		);

		const { octokit, values } = await getInputValuesAndOctokit(args, defaults);

		skipRestore = values.skipRestore;

		await run({ octokit, values });

		prompts.outro(chalk.blue`Great, looks like everything worked! 🎉`);

		console.log(chalk.blue`You may consider committing these changes:`);
		console.log();
		console.log(chalk.gray`git add -A`);
		console.log(chalk.gray(`git commit -m "chore: ${label} repo"`));
		console.log(chalk.gray`git push`);
		console.log();
		console.log(chalk.greenBright`See ya! 👋`);
		console.log();

		return 0;
	} catch (error) {
		prompts.outro(
			chalk.red`Looks like there was a problem. Correct it and try again? 😕`
		);

		console.log();
		console.log(error);

		if (skipRestore) {
			console.log();
			console.log(
				chalk.gray`Skipping restoring local repository, as requested.`
			);
			console.log();
		} else {
			const shouldRestore = await prompts.confirm({
				message: "Do you want to restore the repository to how it was?",
			});

			handlePromptCancel(shouldRestore);

			if (shouldRestore) {
				console.log();
				console.log(
					chalk.gray`Resetting repository using`,
					chalk.reset`git restore .`
				);
				await $`git restore .`;
				console.log("Repository is reset. Ready to try again?");
				console.log();
			}
		}

		return 1;
	}
}
