import chalk from "chalk";
import { execaCommand } from "execa";

import { logLine } from "../shared/cli/lines.js";
import { withSpinner } from "../shared/cli/spinners.js";

export async function runCommands(label: string, commands: string[]) {
	const failed: string[] = [];

	await withSpinner(label, async () => {
		for (const command of commands) {
			try {
				await execaCommand(command);
			} catch {
				failed.push(command);
			}
		}
	});

	if (!failed.length) {
		return;
	}

	logLine();

	for (const command of failed) {
		logLine(
			[
				chalk.yellow(`🟡 Running \``),
				chalk.yellowBright(command),
				chalk.yellow(`\` failed. You should run it and fix its complaints.`),
			].join(""),
		);
	}
}
