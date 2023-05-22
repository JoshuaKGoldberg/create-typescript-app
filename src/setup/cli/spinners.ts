import * as prompts from "@clack/prompts";
import chalk from "chalk";

const s = prompts.spinner();

export function skipSpinnerBlock(blockText: string) {
	s.start(chalk.gray("➖ " + blockText));
	s.stop(chalk.gray("➖ " + blockText));
}

export function successSpinnerBlock(blockText: string) {
	s.start(chalk.green("✅ " + blockText));
	s.stop(chalk.green("✅ " + blockText));
}

interface WithSpinnerOptions {
	errorText: string;
	startText: string;
	stopText: string;
	successText: string;
	warnText?: string;
}

export async function withSpinner<Return>(
	callback: () => Promise<Return>,
	{ startText, successText, stopText, errorText, warnText }: WithSpinnerOptions
) {
	s.start(startText);

	try {
		const result = await callback();
		s.stop(
			result === false
				? chalk.yellow("⚠️ " + (warnText ?? errorText))
				: chalk.green("✅ " + successText)
		);
		return result;
	} catch (error) {
		s.stop(chalk.red("❌ " + stopText));

		throw new Error(errorText, { cause: error });
	}
}
