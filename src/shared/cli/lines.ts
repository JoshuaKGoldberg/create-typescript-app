import chalk from "chalk";

export function logLine(line?: string) {
	console.log(makeLine(line));
}

export function logNewSection(line: string) {
	logLine();
	console.log(`◇  ${line}`);
}

export function makeLine(line: string | undefined) {
	return [chalk.gray("│"), line].filter(Boolean).join("  ");
}
