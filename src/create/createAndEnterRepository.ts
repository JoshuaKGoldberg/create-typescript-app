import { $ } from "execa";
import fs from "node:fs/promises";

export async function createAndEnterRepository(repository: string) {
	if ((await fs.readdir(".")).includes(repository)) {
		return false;
	}

	await fs.mkdir(repository);
	process.chdir(repository);
	await $`git init`;

	return true;
}
