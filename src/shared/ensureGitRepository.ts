import { $ } from "execa";

export async function ensureGitRepository() {
	try {
		await $`git status`;
	} catch {
		await $`git init`;
	}
}
