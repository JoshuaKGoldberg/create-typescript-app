import * as prompts from "@clack/prompts";
import chalk from "chalk";
import { $ } from "execa";

import { handlePromptCancel } from "./prompts.js";

export interface RunOrRestoreOptions {
	run: () => Promise<void>;
	skipRestore: boolean | undefined;
}

export async function runOrRestore({ run, skipRestore }: RunOrRestoreOptions) {
	try {
		await run();
		return 0;
	} catch (error) {
		prompts.outro(
			chalk.red`Looks like there was a problem. Correct it and try again? 😕`,
		);

		console.log();
		console.log(error);

		if (skipRestore) {
			console.log();
			console.log(chalk.gray`Leaving changes to the local directory on disk.`);
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
					chalk.reset`git restore .`,
				);
				await $`git restore .`;
				console.log("Repository is reset. Ready to try again?");
				console.log();
			}
		}

		return 1;
	}
}
