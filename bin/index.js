#!/usr/bin/env node
import chalk from "chalk";

console.log(
	[
		"create-typescript-app is now run using ",
		chalk.bold("create"),
		".\n\nRun:\n  ",
		chalk.bold("npx create", process.argv.slice(2).join(" ")),
		"\n\nYou can read more on:\n  https://",
		chalk.bold("create.bingo"),
		"\n\nThanks for using create-typescript-app! 🎁",
	].join(""),
);

process.exitCode = 1;
