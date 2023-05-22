import { $ } from "execa";

import { readFileAsJSON } from "../readFileAsJSON.js";

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

	const outcomeLabels = (await readFileAsJSON(
		"./script/labels.json"
	)) as typeof import("../labels.json");

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
