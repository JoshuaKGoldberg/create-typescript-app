import chalk from "chalk";
import { execaCommand } from "execa";
import { rimraf } from "rimraf";

import { logLine } from "../shared/cli/lines.js";
import { withSpinner } from "../shared/cli/spinners.js";
import { Mode } from "../shared/types.js";

export async function runCleanup(commands: string[], mode: Mode) {
	const failed: string[] = [];

	await withSpinner("Cleaning up files", async () => {
		if (mode === "migrate") {
			// Coverage folders can slow down format and lint times something awful.
			// https://github.com/JoshuaKGoldberg/create-typescript-app/issues/1221
			await rimraf("coverage*");
		}

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
