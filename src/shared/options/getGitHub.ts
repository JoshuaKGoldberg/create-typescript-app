import { $ } from "execa";
import { Octokit } from "octokit";

export interface GitHub {
	auth: string;
	octokit: Octokit;
}

export async function getGitHub(): Promise<GitHub | undefined> {
	try {
		await $`gh auth status`;
	} catch (error) {
		throw new Error("GitHub authentication failed.", {
			cause: (error as Error).message,
		});
	}

	const auth = (await $`gh auth token`).stdout.trim();
	const octokit = new Octokit({ auth });

	return { auth, octokit };
}
