import { $ } from "execa";
import { Octokit } from "octokit";

import { getGitHubUserAsAllContributor } from "../shared/getGitHubUserAsAllContributor.js";
import { Options } from "../shared/types.js";

export async function addToolAllContributors(
	octokit: Octokit | undefined,
	options: Pick<Options, "offline" | "owner">,
) {
	const login = await getGitHubUserAsAllContributor(octokit, options);

	if (login !== "JoshuaKGoldberg") {
		await $`npx -y all-contributors-cli add JoshuaKGoldberg tool`;
	}
}
