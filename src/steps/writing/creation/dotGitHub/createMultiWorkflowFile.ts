import { formatWorkflowYaml } from "./formatWorkflowYaml.js";

export type MultiWorkflowJobStep = { run: string } | { uses: string };

export interface MultiWorkflowJobOptions {
	name: string;
	steps: MultiWorkflowJobStep[];
}

export interface MultiWorkflowFileOptions {
	jobs: MultiWorkflowJobOptions[];
	name: string;
}

export function createMultiWorkflowFile({
	jobs,
	name,
}: MultiWorkflowFileOptions) {
	return formatWorkflowYaml({
		jobs: Object.fromEntries(
			jobs.map((job) => [
				job.name,
				{
					"runs-on": "ubuntu-latest",
					steps: job.steps.map((step) => ({ run: step })),
				},
			]),
		),
		name,
		on: {
			pull_request: null,
			push: {
				branches: ["main"],
			},
		},
	});
}
