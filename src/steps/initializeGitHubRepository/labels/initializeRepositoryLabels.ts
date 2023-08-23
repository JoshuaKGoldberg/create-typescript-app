import { $ } from "execa";

import { getExistingEquivalentLabel } from "./getExistingEquivalentLabel.js";
import { outcomeLabels } from "./outcomeLabels.js";

interface GhLabelData {
	name: string;
}

export async function initializeRepositoryLabels() {
	const getLabelName = (label: { name: string }) => label.name;

	const existingLabels = (
		JSON.parse(
			(await $`gh label list --json name`).stdout || "[]",
		) as GhLabelData[]
	).map(getLabelName);
	const allowedLabels = new Set(outcomeLabels.map(getLabelName));

	for (const outcome of outcomeLabels) {
		const existingEquivalent = getExistingEquivalentLabel(
			existingLabels,
			outcome.name,
		);

		if (existingEquivalent) {
			allowedLabels.add(existingEquivalent);
			await $`gh label edit ${existingEquivalent} --color ${outcome.color} --description ${outcome.description} --name ${outcome.name}`;
		} else {
			await $`gh label create ${outcome.name} --color ${outcome.color} --description ${outcome.description}`;
		}
	}

	for (const existingLabel of existingLabels) {
		if (!allowedLabels.has(existingLabel)) {
			await $`gh label delete ${existingLabel} --yes`;
		}
	}
}
