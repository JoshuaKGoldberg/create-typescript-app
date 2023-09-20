import * as prompts from "@clack/prompts";
import chalk from "chalk";
import { parseArgs } from "node:util";

import { createRerunSuggestion } from "../create/createRerunSuggestion.js";
import { create } from "../create/index.js";
import { initialize } from "../initialize/index.js";
import { migrate } from "../migrate/index.js";
import { logLine } from "../shared/cli/lines.js";
import { StatusCodes } from "../shared/codes.js";
import { logHelpText } from "./help.js";
import { promptForMode } from "./mode.js";
import { getVersionFromPackageJson } from "./packageJson.js";

const operationMessage = (verb: string) =>
	`Operation ${verb}. Exiting - maybe another time? 👋`;

export async function bin(args: string[]) {
	console.clear();

	const version = await getVersionFromPackageJson();

	prompts.intro(
		[
			chalk.greenBright(`✨ Welcome to`),
			chalk.bgGreenBright.black(`create-typescript-app`),
			chalk.greenBright(`${version ? `${version}` : ""}! ✨`),
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
			help: {
				short: "h",
				type: "boolean",
			},
			mode: { type: "string" },
		},
		strict: false,
	});

	const help = values.help;

	if (help) {
		logHelpText();
		return 0;
	}

	const mode = await promptForMode(values.mode);
	if (typeof mode !== "string") {
		prompts.outro(chalk.red(mode?.message ?? operationMessage("cancelled")));
		return 1;
	}

	const { code, options } = await { create, initialize, migrate }[mode](args);

	prompts.log.info(
		[
			chalk.italic(`Tip: to run again with the same input values, use:`),
			chalk.blue(createRerunSuggestion(mode, options)),
		].join(" "),
	);

	if (code) {
		logLine();
		prompts.cancel(
			code === StatusCodes.Cancelled
				? operationMessage("cancelled")
				: operationMessage("failed"),
		);
	}

	return code;
}
