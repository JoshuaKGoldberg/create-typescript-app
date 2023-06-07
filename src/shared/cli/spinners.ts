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

export async function withSpinner<Return>(
	callback: () => Promise<Return>,
	label: string,
	warningHint?: string
) {
	s.start(`${upperFirst(label)}...`);

	try {
		const result = await callback();

		if (result === false) {
			const extra = warningHint ? `: ${warningHint}` : "";
			s.stop(chalk.yellow(`⚠️ Error ${label}${extra}.`));
		} else {
			s.stop(chalk.green(`✅ Passed ${label}.`));
		}

		return result;
	} catch (error) {
		s.stop(chalk.red(`❌ Error ${label}.`));

		throw new Error(`Failed ${label}`, { cause: error });
	}
}

function upperFirst(text: string) {
	return text[0].toUpperCase() + text.slice(1);
}
