import * as prompts from "@clack/prompts";
import chalk from "chalk";
import readline from "readline";

import { logLine, logNewSection, makeLine } from "./lines.js";
import { lowerFirst } from "./lowerFirst.js";
import { startLineWithDots } from "./startLineWithDots.js";

const s = prompts.spinner();

export type SpinnerTask<Return> = () => Promise<Return>;

export type LabeledSpinnerTask<Return> = [string, SpinnerTask<Return>];

export async function withSpinner<Return>(
	label: string,
	task: SpinnerTask<Return>,
) {
	s.start(`${label}...`);

	try {
		const result = await task();

		s.stop(chalk.green(`✅ Passed ${lowerFirst(label)}.`));

		return result;
	} catch (error) {
		s.stop(chalk.red(`❌ Error ${lowerFirst(label)}.`));

		throw new Error(`Failed ${lowerFirst(label)}`, { cause: error });
	}
}

export async function withSpinners(
	label: string,
	tasks: LabeledSpinnerTask<void>[],
) {
	logNewSection(`${label}...`);

	let currentLabel!: string;
	let lastLogged!: string;

	for (const [label, run] of tasks) {
		currentLabel = label;

		const line = makeLine(chalk.gray(` - ${label}`));
		const stopWriting = startLineWithDots(line);

		try {
			await run();
		} catch (error) {
			const descriptor = `${lowerFirst(label)} > ${lowerFirst(currentLabel)}`;

			logLine(chalk.red(`❌ Error ${descriptor}.`));

			throw new Error(`Failed ${descriptor}`, { cause: error });
		} finally {
			const lineLength = stopWriting();
			readline.clearLine(process.stdout, -1);
			readline.moveCursor(process.stdout, -lineLength, 0);
		}

		lastLogged = chalk.gray(`${line} ✔️\n`);

		process.stdout.write(lastLogged);
	}

	readline.moveCursor(process.stdout, -lastLogged.length, -tasks.length - 2);
	readline.clearScreenDown(process.stdout);

	logNewSection(chalk.green(`✅ Passed ${lowerFirst(label)}.`));
}
