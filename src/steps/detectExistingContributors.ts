import { getAllContributorsForRepository } from "all-contributors-for-repository";
import { $ } from "execa";

import { Options } from "../shared/types.js";

export async function detectExistingContributors(
	auth: string | undefined,
	options: Pick<Options, "owner" | "repository">,
) {
	const contributors = await getAllContributorsForRepository({
		auth,
		owner: options.owner,
		repo: options.repository,
	});

	for (const [contributor, contributions] of Object.entries(contributors)) {
		const contributionTypes = Object.keys(contributions).join(",");
		await $({
			env: { PRIVATE_TOKEN: auth },
		})`npx -y all-contributors-cli add ${contributor} ${contributionTypes}`;
	}
}
