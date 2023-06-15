import chalk from "chalk";
import { $ } from "execa";
import { Octokit } from "octokit";

import {
	skipSpinnerBlock,
	successSpinnerBlock,
	withSpinner,
} from "./cli/spinners.js";

export async function getOctokit(
	skipApi: boolean
): Promise<Octokit | undefined> {
	if (skipApi) {
		skipSpinnerBlock(`Skipping checking GitHub authentication.`);
		return undefined;
	}

	successSpinnerBlock(`Checking GitHub authentication.`);

	return await withSpinner(async () => {
		try {
			await $`gh auth status`;
		} catch (error) {
			console.error();
			console.error(chalk.red((error as Error).message));
			console.error();
			// eslint-disable-next-line n/no-process-exit
			process.exit(1);
		}

		const auth = (await $`gh auth token`).stdout.trim();

		return new Octokit({ auth });
	}, "fetching gh auth status");
}
