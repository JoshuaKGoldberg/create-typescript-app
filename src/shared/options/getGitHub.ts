import { getGitHubAuthToken } from "get-github-auth-token";
import { Octokit } from "octokit";

export interface GitHub {
	auth: string;
	octokit: Octokit;
}

export async function getGitHub(): Promise<GitHub | undefined> {
	const auth = await getGitHubAuthToken();

	if (!auth.succeeded) {
		throw new Error("GitHub authentication failed.", {
			cause: auth.error,
		});
	}

	const octokit = new Octokit({ auth: auth.token });

	return { auth: auth.token, octokit };
}
