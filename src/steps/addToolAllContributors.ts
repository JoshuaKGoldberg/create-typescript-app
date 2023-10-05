import { $ } from "execa";

import { getGitHubUserAsAllContributor } from "../shared/getGitHubUserAsAllContributor.js";
import { Options } from "../shared/types.js";

export async function addToolAllContributors(
	options: Pick<Options, "offline" | "owner">,
) {
	const login = await getGitHubUserAsAllContributor(options);

	if (login !== "JoshuaKGoldberg") {
		await $`npx -y all-contributors-cli add JoshuaKGoldberg tool`;
	}
}
