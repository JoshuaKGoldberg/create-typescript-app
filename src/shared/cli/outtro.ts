import * as prompts from "@clack/prompts";
import chalk from "chalk";

export interface OuttroGroup {
	label: string;
	lines?: string[];
}

export function outtro(groups: OuttroGroup[]) {
	prompts.outro(chalk.blue(`Great, looks like the script finished! 🎉`));

	for (const { label, lines } of groups) {
		console.log(chalk.blue(label));
		console.log();

		if (lines) {
			for (const line of lines) {
				console.log(chalk.gray(line));
			}

			console.log();
		}
	}

	console.log(chalk.greenBright(`See ya! 👋`));
	console.log();
}
