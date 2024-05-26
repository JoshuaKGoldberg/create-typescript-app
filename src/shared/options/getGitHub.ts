import { getGitHubAuthToken } from "get-github-auth-token";
import { Octokit } from "octokit";

export interface GitHub {
	auth: string;
	octokit: Octokit;
}

export async function getGitHub(): Promise<GitHub | undefined> {
	const auth = await getGitHubAuthToken();

	if (!auth.succeeded) {
		throw new Error(
			"Couldn't authenticate with GitHub. Either log in with `gh auth login` (https://cli.github.com) or set a GH_TOKEN environment variable.",
			{ cause: auth.error },
		);
	}

	const octokit = new Octokit({ auth: auth.token });

	return { auth: auth.token, octokit };
}
