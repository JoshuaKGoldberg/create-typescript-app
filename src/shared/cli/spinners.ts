import * as prompts from "@clack/prompts";
import chalk from "chalk";

import { logLine, logNewSection, makeLine } from "./lines.js";
import { lowerFirst } from "./lowerFirst.js";
import { clearLine, clearScreenDown, moveCursor, write } from "./process.js";
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

	try {
		for (const [label, run] of tasks) {
			currentLabel = label;

			const line = makeLine(chalk.gray(` - ${label}`));
			const stopWriting = startLineWithDots(line);

			await run();

			const lineLength = stopWriting();
			lastLogged = chalk.gray(`${line} ✔️\n`);

			await clearLine(-1);
			await moveCursor(-lineLength, 0);
			await write(lastLogged);
		}

		process.stdout.moveCursor(-lastLogged.length, -tasks.length - 2);
		await clearScreenDown();

		logNewSection(chalk.green(`✅ Passed ${lowerFirst(label)}.`));
	} catch (error) {
		const descriptor = `${lowerFirst(label)} > ${lowerFirst(currentLabel)}`;

		logLine(chalk.red(`❌ Error ${descriptor}.`));

		throw new Error(`Failed ${descriptor}`, { cause: error });
	}
}
