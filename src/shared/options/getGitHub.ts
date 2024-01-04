import { $ } from "execa";
import { Octokit } from "octokit";

export interface GitHub {
	auth: string;
	octokit: Octokit;
}

async function tryGhAuthToken() {
	try {
		return (await $`gh auth token`).stdout.trim();
	} catch {
		return undefined;
	}
}

export async function getGitHub(): Promise<GitHub | undefined> {
	const auth = (await tryGhAuthToken()) ?? process.env.GH_TOKEN;
	if (!auth) {
		throw new Error(
			"Couldn't authenticate with GitHub. Either log in with `gh auth login` (https://cli.github.com) or set a GH_TOKEN environment variable.",
		);
	}

	const octokit = new Octokit({ auth });

	return { auth, octokit };
}
