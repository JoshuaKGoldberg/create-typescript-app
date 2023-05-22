import chalk from "chalk";
import { $ } from "execa";
import { Octokit } from "octokit";

import {
	skipSpinnerBlock,
	successSpinnerBlock,
	withSpinner,
} from "../cli/spinners.js";

export async function getOctokit(
	skipApi: boolean
): Promise<Octokit | undefined> {
	if (skipApi) {
		skipSpinnerBlock(`Skipping checking GitHub authentication.`);
		return undefined;
	}

	successSpinnerBlock(`Checking GitHub authentication.`);

	return await withSpinner(
		async () => {
			try {
				await $`gh auth status`;
			} catch (error) {
				console.error();
				console.error(chalk.red((error as Error).message));
				console.error();
				process.exit(0);
			}

			const auth = (await $`gh auth token`).stdout.trim();

			return new Octokit({ auth });
		},
		{
			startText: `Fetching gh auth status...`,
			successText: `Fetched gh auth status.`,
			stopText: `Error fetching gh auth status.`,
			errorText: `Could not fetch github auth token. `,
		}
	);
}
