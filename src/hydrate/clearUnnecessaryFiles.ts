import chalk from "chalk";
import { execaCommand } from "execa";

export async function clearUnnecessaryFiles() {
	for (const glob of [
		"dist lib package-lock.json yarn.lock",
		".eslintrc*",
		"./src/**/*.js",
	]) {
		try {
			console.log(chalk.gray(`rm -rf ${glob}`));
			await execaCommand(`rm -rf ${glob}`);
		} catch {
			// (we ignore failures if nothing matched)
		}
	}
}
