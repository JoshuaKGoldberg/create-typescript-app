import chalk from "chalk";
import { $ } from "execa";

import { logLine } from "./cli/lines.js";

export async function ensureGitRepository() {
	try {
		await $`git status`;
	} catch {
		logLine();
		logLine(
			chalk.gray("Running `git init` to turn this into a Git repository."),
		);

		await $`git init`;
	}
}
