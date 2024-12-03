import * as prompts from "@clack/prompts";
import chalk from "chalk";
import { $ } from "execa";

import { logLine } from "./cli/lines.js";
import { StatusCodes } from "./codes.js";

export interface RunOrRestoreOptions {
	run: () => Promise<void>;
	skipRestore: boolean | undefined;
}

export async function runOrRestore({ run, skipRestore }: RunOrRestoreOptions) {
	try {
		await run();
		return StatusCodes.Success;
	} catch (error) {
		logLine();
		console.log(error);

		if (skipRestore) {
			logLine();
			logLine(chalk.gray`Leaving changes to the local directory on disk.`);
		} else {
			const shouldRestore = await prompts.confirm({
				message: "Do you want to restore the repository to how it was?",
			});

			if (shouldRestore) {
				logLine();
				logLine(
					[
						chalk.gray`Resetting repository using`,
						chalk.reset`git restore .`,
					].join(" "),
				);
				await $`git restore .`;
			}
		}

		return 2;
	}
}
