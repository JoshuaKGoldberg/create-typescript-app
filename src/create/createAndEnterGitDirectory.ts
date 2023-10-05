import { $ } from "execa";
import * as fs from "node:fs/promises";
import * as process from "node:process";

export async function createAndEnterGitDirectory(directory: string) {
	if (directory !== "." && !(await fs.readdir(".")).includes(directory)) {
		await fs.mkdir(directory);
	} else if ((await fs.readdir(directory)).length) {
		return false;
	}

	if (directory !== ".") {
		process.chdir(directory);
	}

	await $`git init -b main`;

	return true;
}
