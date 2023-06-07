import chalk from "chalk";
import { execaCommand } from "execa";

import { logLine } from "../../shared/cli/lines.js";
import { withSpinner } from "../../shared/cli/spinners.js";

export async function runCommand(command: string, label: string) {
	const succeeded = await withSpinner(async () => {
		try {
			await execaCommand(command);
			return true;
		} catch {
			return false;
		}
	}, label);

	if (!succeeded) {
		logLine();
		logLine(
			[
				chalk.yellow(`⚠️ Running \``),
				chalk.yellowBright(command),
				chalk.yellow(`\` failed. You should run it and fix its complaints.`),
			].join("")
		);
	}
}
