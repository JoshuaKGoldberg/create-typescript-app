import { $ } from "execa";
import { Octokit } from "octokit";

export async function getOctokit(): Promise<Octokit | undefined> {
	try {
		await $`gh auth status`;
	} catch (error) {
		throw new Error("GitHub authentication failed.", {
			cause: (error as Error).message,
		});
	}

	const auth = (await $`gh auth token`).stdout.trim();

	return new Octokit({ auth });
}
