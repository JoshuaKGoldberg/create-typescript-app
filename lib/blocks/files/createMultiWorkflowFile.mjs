import { resolveUses } from "../actions/resolveUses.mjs";
import { createJobName } from "./createJobName.mjs";
import { formatWorkflowYaml } from "./formatWorkflowYaml.mjs";
//#region src/blocks/files/createMultiWorkflowFile.ts
function createMultiWorkflowFile({ jobs, name, workflowsVersions }) {
	return formatWorkflowYaml({
		jobs: Object.fromEntries(jobs.map((job) => [createJobName(job.name), {
			if: job.if,
			name: job.name,
			"runs-on": "ubuntu-latest",
			steps: [
				{
					uses: resolveUses("actions/checkout", "v4", workflowsVersions),
					with: job.checkoutWith
				},
				{ uses: "./.github/actions/prepare" },
				...job.steps
			]
		}])),
		name,
		on: {
			pull_request: null,
			push: { branches: ["main"] }
		}
	});
}
//#endregion
export { createMultiWorkflowFile };
