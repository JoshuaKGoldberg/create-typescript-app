import { Octokit } from "octokit";

import { Options } from "../../../shared/types.js";
import { getExistingEquivalentLabels } from "./getExistingEquivalentLabels.js";
import { outcomeLabels } from "./outcomeLabels.js";

export async function initializeRepositoryLabels(
	octokit: Octokit,
	options: Pick<Options, "owner" | "repository">,
) {
	const { data: existingLabels } = await octokit.request(
		"GET /repos/{owner}/{repo}/labels",
		{
			headers: {
				"X-GitHub-Api-Version": "2022-11-28",
			},
			owner: options.owner,
			repo: options.repository,
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
				color: outcome.color.replace("#", ""),
				description: outcome.description,
				headers: {
					"X-GitHub-Api-Version": "2022-11-28",
				},
				name: outcome.name,
				owner: options.owner,
				repo: options.repository,
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
					owner: options.owner,
					repo: options.repository,
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
					color: outcome.color.replace("#", ""),
					description: outcome.description,
					headers: {
						"X-GitHub-Api-Version": "2022-11-28",
					},
					name: existingEquivalent.name,
					new_name: outcome.name,
					owner: options.owner,
					repo: options.repository,
				});
			}
		}
	}
}
