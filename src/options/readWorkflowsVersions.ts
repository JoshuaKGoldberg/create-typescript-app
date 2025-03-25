import { TakeInput } from "bingo";
import { inputFromFile } from "input-from-file";

import { inputFromDirectory } from "../inputs/inputFromDirectory.js";
import { WorkflowsVersions } from "../schemas.js";

export async function readWorkflowsVersions(
	take: TakeInput,
): Promise<WorkflowsVersions> {
	const collection: WorkflowsVersions = {};

	const compositeNames = await take(inputFromDirectory, {
		directoryPath: ".github/actions",
	});

	for (const compositeName of compositeNames) {
		const compositeFileNames = await take(inputFromDirectory, {
			directoryPath: `.github/actions/${compositeName}`,
		});

		for (const compositeFileName of compositeFileNames) {
			await collectFile(
				`.github/actions/${compositeName}/${compositeFileName}`,
			);
		}
	}

	const workflowFileNames = await take(inputFromDirectory, {
		directoryPath: ".github/workflows",
	});

	await Promise.all(
		workflowFileNames.map(async (workflowFileName) => {
			await collectFile(`.github/workflows/${workflowFileName}`);
		}),
	);

	async function collectFile(filePath: string) {
		const raw = await take(inputFromFile, { filePath });
		if (raw instanceof Error) {
			return;
		}

		for (const match of raw.matchAll(/uses:\s*(\w.+)/g)) {
			const [, uses] = match;
			collectUses(uses);
		}
	}

	function collectUses(uses: string) {
		const matched = /([^#@]+)@([^ #]+)(?: # ([a-z\d.]+))?/.exec(uses);
		if (!matched) {
			return;
		}

		const [, action, actual, commented] = matched;

		collection[action] ??= {};

		if (commented) {
			collection[action][commented] ??= {};
			collection[action][commented].hash = actual;
		} else {
			collection[action][actual] ??= {};
			collection[action][actual].pinned = true;
		}
	}

	return collection;
}
