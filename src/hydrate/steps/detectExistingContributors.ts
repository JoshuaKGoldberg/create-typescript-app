import { $ } from "execa";
import { createAllContributorsForRepository } from "all-contributors-for-repository";

export async function detectExistingContributors() {
	const contributors = await createAllContributorsForRepository({
		owner: "JoshuaKGoldberg",
		repo: "template-typescript-node-package",
	});

	for (const [contributor, contributions] of Object.entries(contributors)) {
		const contributionTypes = Object.keys(contributions).join(",");
		await $`npx all-contributors add ${contributor} ${contributionTypes}`;
	}
}
