import * as prompts from "@clack/prompts";
import chalk from "chalk";
import { parseArgs } from "node:util";

import { create } from "../create/index.js";
import { initialize } from "../initialize/index.js";
import { migrate } from "../migrate/index.js";
import { logLine } from "../shared/cli/lines.js";
import { promptForMode } from "./mode.js";

export async function bin(args: string[]) {
	console.clear();

	prompts.intro(
		[
			chalk.greenBright(`Welcome to`),
			chalk.bgGreenBright.black(`create-typescript-app`),
			chalk.greenBright(`! 🎉`),
		].join(" "),
	);

	logLine();
	logLine(
		chalk.yellow(
			"⚠️ This template is early stage, opinionated, and not endorsed by the TypeScript team. ⚠️",
		),
	);
	logLine(
		chalk.yellow(
			"⚠️ If any tooling it sets displeases you, you can always remove that portion manually. ⚠️",
		),
	);

	const { values } = parseArgs({
		args,
		options: {
			mode: { type: "string" },
		},
		strict: false,
	});

	const mode = await promptForMode(values.mode);
	if (mode instanceof Error) {
		prompts.outro(chalk.red(mode.message));
		return 1;
	}

	logLine();
	logLine(
		chalk.blue(
			"Let's collect some information to fill out repository details...",
		),
	);

	return await { create, initialize, migrate }[mode](args);
}
