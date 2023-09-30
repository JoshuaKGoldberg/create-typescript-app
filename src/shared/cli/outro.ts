import * as prompts from "@clack/prompts";
import chalk from "chalk";

export interface OutroGroup {
	label: string;
	lines?: string[];
	variant?: "code";
}

export function outro(groups: OutroGroup[]) {
	prompts.outro(chalk.blue(`Great, looks like the script finished! 🎉`));

	for (const { label, lines, variant } of groups) {
		console.log(chalk.blue(label));
		console.log();

		if (lines) {
			for (const line of lines) {
				console.log(variant === "code" ? chalk.gray(line) : line);
			}

			console.log();
		}
	}

	console.log(chalk.greenBright(`See ya! 👋`));
	console.log();
}
