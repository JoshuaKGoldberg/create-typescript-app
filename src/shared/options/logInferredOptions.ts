import chalk from "chalk";

import { logLine } from "../cli/lines.js";
import { Options } from "../types.js";

export type InferredOptions = Pick<
	Options,
	"description" | "email" | "guide" | "logo" | "owner" | "repository" | "title"
>;

export function logInferredOptions(augmentedOptions: InferredOptions) {
	logLine();
	logLine(chalk.gray("--auto inferred the following values:"));
	logLine(chalk.gray(`- description: ${augmentedOptions.description}`));
	logLine(chalk.gray(`- email-github: ${augmentedOptions.email.github}`));
	logLine(chalk.gray(`- email-npm: ${augmentedOptions.email.github}`));

	if (augmentedOptions.guide) {
		logLine(chalk.gray(`- guide: ${augmentedOptions.guide.href}`));
		logLine(chalk.gray(`- guide-title: ${augmentedOptions.guide.title}`));
	}

	if (augmentedOptions.logo) {
		logLine(chalk.gray(`- logo: ${augmentedOptions.logo.src}`));
		logLine(chalk.gray(`- logo-alt: ${augmentedOptions.logo.alt}`));
	}

	logLine(chalk.gray(`- owner: ${augmentedOptions.owner}`));
	logLine(chalk.gray(`- repository: ${augmentedOptions.repository}`));
	logLine(chalk.gray(`- title: ${augmentedOptions.title}`));
}
