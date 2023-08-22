import chalk from "chalk";
import { $ } from "execa";
import { Octokit } from "octokit";

import { runOrSkip } from "./cli/runOrSkip.js";

export async function getOctokit(
	skipApi: boolean,
): Promise<Octokit | undefined> {
	return runOrSkip("Checking GitHub authentication", skipApi, async () => {
		try {
			await $`gh auth status`;
		} catch (error) {
			console.error();
			console.error(chalk.red((error as Error).message));
			console.error();
			throw new Error("GitHub authentication failed.");
		}

		const auth = (await $`gh auth token`).stdout.trim();

		return new Octokit({ auth });
	});
}
