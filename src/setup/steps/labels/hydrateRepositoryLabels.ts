import { $ } from "execa";

import { getExistingEquivalentLabel } from "./getExistingEquivalentLabel.js";
import { outcomeLabels } from "./outcomeLabels.js";

interface GhLabelData {
	name: string;
}

export async function hydrateRepositoryLabels() {
	const getLabelName = (label: { name: string }) => label.name;

	const existingLabels = (
		JSON.parse(
			(await $`gh label list --json name`).stdout || "[]"
		) as GhLabelData[]
	).map(getLabelName);

	for (const outcome of outcomeLabels) {
		const existingEquivalent = getExistingEquivalentLabel(
			existingLabels,
			outcome.name
		);
		const [action, label] = existingEquivalent
			? ["edit", existingEquivalent]
			: ["create", outcome.name];

		await $`gh label ${action} ${label} --color ${outcome.color} --description ${outcome.description}`;
	}

	const allowedLabels = new Set(outcomeLabels.map(getLabelName));

	for (const existingLabel of existingLabels) {
		if (!allowedLabels.has(existingLabel)) {
			await $`gh label delete ${existingLabel} --yes`;
		}
	}
}
