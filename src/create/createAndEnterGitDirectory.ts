import { $ } from "execa";
import * as fs from "node:fs/promises";
import * as process from "node:process";

export async function createAndEnterGitDirectory(directory: string) {
	if (directory !== "." && !(await fs.readdir(".")).includes(directory)) {
		await fs.mkdir(directory);
	} else if ((await fs.readdir(directory)).length) {
		return undefined;
	}

	if (directory !== ".") {
		process.chdir(directory);
	}

	await $`git init -b main`;

	// https://github.com/JoshuaKGoldberg/create-typescript-app/pull/1781
	// For some reason, after this function returns, the cwd was resetting back?
	// Maybe some parallelized running of scripts was messing with it?
	// All this code will be gone soon once the create engine takes over anyway.
	return process.cwd();
}
