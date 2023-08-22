import { $ } from "execa";

import { getGitHubUserAsAllContributor } from "../shared/getGitHubUserAsAllContributor.js";

export async function addAllContributors(owner: string) {
	const login = await getGitHubUserAsAllContributor(owner);

	if (login !== "JoshuaKGoldberg") {
		await $`npx all-contributors add JoshuaKGoldberg tool`;
	}
}
