import { $ } from "execa";

import {
	GhLabelData,
	getExistingEquivalentLabel,
} from "./getExistingEquivalentLabel.js";
import { outcomeLabels } from "./outcomeLabels.js";

export async function initializeRepositoryLabels() {
	const existingLabels = JSON.parse(
		(await $`gh label list --json color,description,name`).stdout || "[]",
	) as GhLabelData[];

	for (const outcome of outcomeLabels) {
		const existingEquivalent = getExistingEquivalentLabel(
			existingLabels,
			outcome.name,
		);

		if (existingEquivalent) {
			if (
				outcome.color !== existingEquivalent.color ||
				outcome.description !== existingEquivalent.description
			) {
				await $`gh label edit ${existingEquivalent.name} --color ${outcome.color} --description ${outcome.description} --name ${outcome.name}`;
			}
		} else {
			await $`gh label create ${outcome.name} --color ${outcome.color} --description ${outcome.description}`;
		}
	}
}
