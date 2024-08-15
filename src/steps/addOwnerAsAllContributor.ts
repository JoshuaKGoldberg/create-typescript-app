import * as fs from "node:fs/promises";
import { Octokit } from "octokit";

import { getGitHubUserAsAllContributor } from "../shared/getGitHubUserAsAllContributor.js";
import { readFileAsJson } from "../shared/readFileAsJson.js";
import { AllContributorsData, Options } from "../shared/types.js";
import { formatJson } from "./writing/creation/formatters/formatJson.js";

export async function addOwnerAsAllContributor(
	octokit: Octokit | undefined,
	options: Pick<Options, "offline" | "owner">,
) {
	const user = await getGitHubUserAsAllContributor(octokit, options);

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
				: {
						...contributor,
						contributions: Array.from(
							new Set([...contributor.contributions, "tool"]),
						),
					},
		);

	if (!contributors.some((contributor) => contributor.login === user)) {
		contributors.push({
			contributions: ["tool"],
			login: user,
		});
	}

	await fs.writeFile(
		"./.all-contributorsrc",
		await formatJson({
			...existingContributors,
			contributors,
		}),
	);
}

function isValidAllContributorsData(
	value: unknown,
): value is AllContributorsData {
	return !!value && typeof value === "object" && "contributors" in value;
}
