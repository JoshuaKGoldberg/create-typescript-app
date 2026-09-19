import { swallowErrorAsync } from "../utils/swallowErrorAsync.mjs";
import { inputFromDirectory } from "../inputs/inputFromDirectory.mjs";
import { inputFromFile } from "input-from-file";
//#region src/options/readWorkflowsVersions.ts
async function readWorkflowsVersions(take) {
	const workflowsVersions = {};
	async function collectCompositeUses() {
		const compositeNames = await take(inputFromDirectory, { directoryPath: ".github/actions" });
		await Promise.all(compositeNames.map(async (compositeName) => {
			const compositeFileNames = await take(inputFromDirectory, { directoryPath: `.github/actions/${compositeName}` });
			for (const compositeFileName of compositeFileNames) await collectFile(`.github/actions/${compositeName}/${compositeFileName}`);
		}));
	}
	async function collectWorkflowUses() {
		const workflowFileNames = await take(inputFromDirectory, { directoryPath: ".github/workflows" });
		await Promise.all(workflowFileNames.map(async (workflowFileName) => {
			await collectFile(`.github/workflows/${workflowFileName}`);
		}));
	}
	async function collectFile(filePath) {
		const raw = await take(inputFromFile, { filePath });
		if (raw instanceof Error) return;
		for (const match of raw.matchAll(/uses:\s*(\w.+)/g)) {
			const [, uses] = match;
			collectUses(uses);
		}
	}
	function collectUses(uses) {
		const matched = /([^#@]+)@([^ #]+)(?: # ([a-z\d.]+))?/.exec(uses);
		if (!matched) return;
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
	await Promise.all([swallowErrorAsync(collectCompositeUses()), swallowErrorAsync(collectWorkflowUses())]);
	return workflowsVersions;
}
//#endregion
export { readWorkflowsVersions };
