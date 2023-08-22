import * as prompts from "@clack/prompts";
import chalk from "chalk";

import { lowerFirst } from "./lowerFirst.js";

const s = prompts.spinner();

export function skipSpinnerBlock(blockText: string) {
	s.start(chalk.gray("➖ " + blockText));
	s.stop(chalk.gray("➖ " + blockText));
}

export async function withSpinner<Return>(
	label: string,
	callback: () => Promise<Return>,
) {
	s.start(`${label}...`);

	try {
		const result = await callback();

		if (result === false) {
			s.stop(chalk.yellow(`⚠️ Error ${lowerFirst(label)}.`));
		} else {
			s.stop(chalk.green(`✅ Passed ${lowerFirst(label)}.`));
		}

		return result;
	} catch (error) {
		s.stop(chalk.red(`❌ Error ${lowerFirst(label)}.`));

		throw new Error(`Failed ${lowerFirst(label)}`, { cause: error });
	}
}
