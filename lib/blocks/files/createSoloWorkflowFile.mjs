import { createJobName } from "./createJobName.mjs";
import { formatWorkflowYaml } from "./formatWorkflowYaml.mjs";
//#region src/blocks/files/createSoloWorkflowFile.ts
function createSoloWorkflowFile({ concurrency, jobName, name, on, permissions, ...options }) {
	return formatWorkflowYaml({
		concurrency,
		jobs: { [createJobName(jobName ?? name)]: {
			...options.if && { if: options.if },
			...jobName && { name: jobName },
			permissions,
			"runs-on": "ubuntu-latest",
			steps: options.steps
		} },
		name,
		on
	});
}
//#endregion
export { createSoloWorkflowFile };
