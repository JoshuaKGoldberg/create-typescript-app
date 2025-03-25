import { TakeInput } from "bingo";
import { inputFromFile } from "input-from-file";

import { inputFromDirectory } from "../inputs/inputFromDirectory.js";
import { WorkflowsVersions } from "../schemas.js";
import { swallowErrorAsync } from "../utils/swallowErrorAsync.js";

export async function readWorkflowsVersions(
	take: TakeInput,
): Promise<WorkflowsVersions> {
	const workflowsVersions: WorkflowsVersions = {};

	// TODO: This would be more straightforward if bingo-fs provided globbing...
	// If you want to increase test coverage here, please do that first :)
	// https://github.com/JoshuaKGoldberg/bingo/issues/308

	async function collectCompositeUses() {
		const compositeNames = await take(inputFromDirectory, {
			directoryPath: ".github/actions",
		});

		await Promise.all(
			compositeNames.map(async (compositeName) => {
				const compositeFileNames = await take(inputFromDirectory, {
					directoryPath: `.github/actions/${compositeName}`,
				});

				for (const compositeFileName of compositeFileNames) {
					await collectFile(
						`.github/actions/${compositeName}/${compositeFileName}`,
					);
				}
			}),
		);
	}

	async function collectWorkflowUses() {
		const workflowFileNames = await take(inputFromDirectory, {
			directoryPath: ".github/workflows",
		});

		await Promise.all(
			workflowFileNames.map(async (workflowFileName) => {
				await collectFile(`.github/workflows/${workflowFileName}`);
			}),
		);
	}

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

		workflowsVersions[action] ??= {};

		if (commented) {
			workflowsVersions[action][commented] ??= {};
			workflowsVersions[action][commented].hash = actual;
		} else {
			workflowsVersions[action][actual] ??= {};
			workflowsVersions[action][actual].pinned = true;
		}
	}

	await Promise.all([
		swallowErrorAsync(collectCompositeUses()),
		swallowErrorAsync(collectWorkflowUses()),
	]);

	return workflowsVersions;
}
