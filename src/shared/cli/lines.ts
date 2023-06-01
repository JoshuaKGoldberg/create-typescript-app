import chalk from "chalk";

export function logLine(line?: string) {
	console.log([chalk.gray("│"), line].filter(Boolean).join("  "));
}
