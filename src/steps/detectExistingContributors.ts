import { getAllContributorsForRepository } from "all-contributors-for-repository";
import { $ } from "execa";

import { Options } from "../shared/types.js";

export async function detectExistingContributors(
	options: Pick<Options, "owner" | "repository">,
) {
	const contributors = await getAllContributorsForRepository({
		owner: options.owner,
		repo: options.repository,
	});

	for (const [contributor, contributions] of Object.entries(contributors)) {
		const contributionTypes = Object.keys(contributions).join(",");
		await $`npx -y all-contributors-cli add ${contributor} ${contributionTypes}`;
	}
}
