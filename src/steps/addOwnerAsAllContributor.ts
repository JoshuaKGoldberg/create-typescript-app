import fs from "node:fs/promises";
import prettier from "prettier";

import { getGitHubUserAsAllContributor } from "../shared/getGitHubUserAsAllContributor.js";
import { readFileAsJson } from "../shared/readFileAsJson.js";
import { AllContributorsData } from "../shared/types.js";

export async function addOwnerAsAllContributor(owner: string) {
	const user = await getGitHubUserAsAllContributor(owner);

	const existingContributors = (await readFileAsJson(
		"./.all-contributorsrc",
	)) as AllContributorsData;
	if (!isValidAllContributorsData(existingContributors)) {
		throw new Error(
			`Invalid .all-contributorsrc: ${JSON.stringify(existingContributors)}`,
		);
	}

	const contributors = existingContributors.contributors
		.filter(({ login }) => ["JoshuaKGoldberg", user].includes(login))
		.map((contributor) =>
			contributor.login === "JoshuaKGoldberg"
				? { ...contributor, contributions: ["tool"] }
				: contributor,
		);

	if (!contributors.some((contributor) => contributor.login === user)) {
		contributors.push({
			contributions: ["tool"],
			login: user,
		});
	}

	await fs.writeFile(
		"./.all-contributorsrc",
		await prettier.format(
			JSON.stringify({
				...existingContributors,
				contributors,
			}),
			{ parser: "json" },
		),
	);
}

function isValidAllContributorsData(
	value: unknown,
): value is AllContributorsData {
	return !!value && typeof value === "object" && "contributors" in value;
}
