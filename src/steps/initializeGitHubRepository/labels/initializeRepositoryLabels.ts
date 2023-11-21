import { Octokit } from "octokit";

import { getExistingEquivalentLabels } from "./getExistingEquivalentLabels.js";
import { outcomeLabels } from "./outcomeLabels.js";

export async function initializeRepositoryLabels(octokit: Octokit) {
	const { data: existingLabels } = await octokit.request(
		"GET /repos/{owner}/{repo}/labels",
		{
			headers: {
				"X-GitHub-Api-Version": "2022-11-28",
			},
			owner: "OWNER",
			repo: "REPO",
		},
	);

	for (const outcome of outcomeLabels) {
		const existingEquivalents = getExistingEquivalentLabels(
			existingLabels,
			outcome.name,
		);

		// Case: the repo has neither of the two label types
		if (!existingEquivalents.length) {
			await octokit.request("POST /repos/{owner}/{repo}/labels", {
				color: outcome.color,
				description: outcome.description,
				headers: {
					"X-GitHub-Api-Version": "2022-11-28",
				},
				name: outcome.name,
				owner: "OWNER",
				repo: "REPO",
			});
			continue;
		}

		for (const existingEquivalent of existingEquivalents) {
			// Case: the repo already has both prefixed and non-prefixed label name types
			// E.g. both "area: documentation" and "documentation"
			if (
				existingEquivalent.name !== outcome.name &&
				existingLabels.some((existing) => existing.name === outcome.name)
			) {
				await octokit.request("DELETE /repos/{owner}/{repo}/labels/{name}", {
					headers: {
						"X-GitHub-Api-Version": "2022-11-28",
					},
					name: existingEquivalent.name,
					owner: "OWNER",
					repo: "REPO",
				});

				continue;
			}

			// Case: the repo has one of the two label types, with >=1 different property
			// E.g. "documentation" and the same color and description
			// E.g. "area: documentation" but with a different color
			if (
				outcome.color !== existingEquivalent.color ||
				outcome.description !== existingEquivalent.description ||
				outcome.name !== existingEquivalent.name
			) {
				await octokit.request("PATCH /repos/{owner}/{repo}/labels/{name}", {
					color: outcome.color,
					description: outcome.description,
					headers: {
						"X-GitHub-Api-Version": "2022-11-28",
					},
					name: existingEquivalent.name,
					new_name: outcome.name,
					owner: "OWNER",
					repo: "REPO",
				});
			}
		}
	}
}
