import { $ } from "execa";

import {
	GhLabelData,
	getExistingEquivalentLabels,
} from "./getExistingEquivalentLabels.js";
import { outcomeLabels } from "./outcomeLabels.js";

export async function initializeRepositoryLabels() {
	const existingLabels = JSON.parse(
		(await $`gh label list --json color,description,name`).stdout || "[]",
	) as GhLabelData[];

	for (const outcome of outcomeLabels) {
		const existingEquivalents = getExistingEquivalentLabels(
			existingLabels,
			outcome.name,
		);

		// Case: the repo has neither of the two label types
		if (!existingEquivalents.length) {
			await $`gh label create ${outcome.name} --color ${outcome.color} --description ${outcome.description}`;
			continue;
		}

		for (const existingEquivalent of existingEquivalents) {
			// Case: the repo already has both prefixed and non-prefixed label name types
			// E.g. both "area: documentation" and "documentation"
			if (
				existingEquivalent.name !== outcome.name &&
				existingLabels.some((existing) => existing.name === outcome.name)
			) {
				await $`gh label delete ${existingEquivalent.name} --yes`;
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
				await $`gh label edit ${existingEquivalent.name} --color ${outcome.color} --description ${outcome.description} --name ${outcome.name}`;
			}
		}
	}
}
