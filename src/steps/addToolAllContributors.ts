import { $ } from "execa";

import { getGitHubUserAsAllContributor } from "../shared/getGitHubUserAsAllContributor.js";

export async function addToolAllContributors(owner: string) {
	const login = await getGitHubUserAsAllContributor(owner);

	if (login !== "JoshuaKGoldberg") {
		await $`npx -y all-contributors-cli add JoshuaKGoldberg tool`;
	}
}
