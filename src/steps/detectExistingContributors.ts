import { getAllContributorsForRepository } from "all-contributors-for-repository";
import { $ } from "execa";

export async function detectExistingContributors() {
	const contributors = await getAllContributorsForRepository({
		owner: "JoshuaKGoldberg",
		repo: "create-typescript-app",
	});

	for (const [contributor, contributions] of Object.entries(contributors)) {
		const contributionTypes = Object.keys(contributions).join(",");
		await $`npx -y all-contributors-cli add ${contributor} ${contributionTypes}`;
	}
}
