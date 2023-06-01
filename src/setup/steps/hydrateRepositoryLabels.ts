import { $ } from "execa";

import { readFileAsJSON } from "../readFileAsJSON.js";

interface GhLabelData {
	name: string;
}

interface FileLabelData {
	color: string;
	description: string;
	name: string;
}

export async function hydrateRepositoryLabels() {
	const getLabelName = (label: { name: string }) => label.name;

	const existingLabels = (
		JSON.parse(
			(await $`gh label list --json name`).stdout || "[]"
		) as GhLabelData[]
	).map(getLabelName);

	const outcomeLabels = (await readFileAsJSON(
		"./src/setup/labels.json"
	)) as FileLabelData[];

	for (const outcome of outcomeLabels) {
		const action = existingLabels.some((existing) => existing === outcome.name)
			? "edit"
			: "create";
		await $`gh label ${action} ${outcome.name} --color ${outcome.color} --description ${outcome.description}`;
	}

	const allowedLabels = new Set(outcomeLabels.map(getLabelName));

	for (const existingLabel of existingLabels) {
		if (!allowedLabels.has(existingLabel)) {
			await $`gh label delete ${existingLabel} --yes`;
		}
	}
}
