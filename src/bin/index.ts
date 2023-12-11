import * as prompts from "@clack/prompts";
import chalk from "chalk";
import { parseArgs } from "node:util";
import { fromZodError } from "zod-validation-error";

import { createRerunSuggestion } from "../create/createRerunSuggestion.js";
import { create } from "../create/index.js";
import { initialize } from "../initialize/index.js";
import { migrate } from "../migrate/index.js";
import { logLine } from "../shared/cli/lines.js";
import { StatusCodes } from "../shared/codes.js";
import { logHelpText } from "./help.js";
import { getVersionFromPackageJson } from "./packageJson.js";
import { promptForMode } from "./promptForMode.js";

const operationMessage = (verb: string) =>
	`Operation ${verb}. Exiting - maybe another time? 👋`;

export async function bin(args: string[]) {
	console.clear();

	const version = await getVersionFromPackageJson();

	const introPrompts = [
		chalk.greenBright(`✨ Welcome to`),
		chalk.bgGreenBright.black(`create-typescript-app`),
		chalk.greenBright(`${version}! ✨`),
	].join(" ");

	const introWarnings = [
		chalk.yellow(
			"⚠️ This template is early stage, opinionated, and not endorsed by the TypeScript team. ⚠️",
		),
		chalk.yellow(
			"⚠️ If any tooling it sets displeases you, you can always remove that portion manually. ⚠️",
		),
	];

	const { values } = parseArgs({
		args,
		options: {
			help: {
				short: "h",
				type: "boolean",
			},
			mode: { type: "string" },
			version: {
				short: "v",
				type: "boolean",
			},
		},
		strict: false,
	});

	if (values.help) {
		logHelpText([introPrompts, ...introWarnings]);
		return 0;
	}

	if (values.version) {
		console.log(version);
		return 0;
	}

	prompts.intro(introPrompts);

	logLine();
	logLine(introWarnings[0]);
	logLine(introWarnings[1]);

	const { mode, options: promptedOptions } = await promptForMode(
		!!values.auto,
		values.mode,
	);
	if (typeof mode !== "string") {
		prompts.outro(chalk.red(mode?.message ?? operationMessage("cancelled")));
		return 1;
	}

	const runners = { create, initialize, migrate };
	const { code, error, options } = await runners[mode](args, promptedOptions);

	prompts.log.info(
		[
			chalk.italic(`Tip: to run again with the same input values, use:`),
			chalk.blue(createRerunSuggestion(options)),
		].join(" "),
	);

	if (code) {
		logLine();

		if (error) {
			logLine(
				chalk.red(typeof error === "string" ? error : fromZodError(error)),
			);
			logLine();
		}

		prompts.cancel(
			code === StatusCodes.Cancelled
				? operationMessage("cancelled")
				: operationMessage("failed"),
		);
	}

	return code;
}
