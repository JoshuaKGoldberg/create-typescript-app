import { createJobName } from "./createJobName.js";
import { formatWorkflowYaml } from "./formatWorkflowYaml.js";

export interface MultiWorkflowFileOptions {
	jobs: MultiWorkflowJobOptions[];
	name: string;
}

export interface MultiWorkflowJobOptions {
	checkoutWith?: Record<string, string>;
	if?: string;
	name: string;
	steps: MultiWorkflowJobStep[];
}

export type MultiWorkflowJobStep = { if?: string } & (
	| { run: string }
	| { uses: string }
);

export function createMultiWorkflowFile({
	jobs,
	name,
}: MultiWorkflowFileOptions) {
	return formatWorkflowYaml({
		jobs: Object.fromEntries(
			jobs.map((job) => [
				createJobName(job.name),
				{
					if: job.if,
					name: job.name,
					"runs-on": "ubuntu-latest",
					steps: [
						{ uses: "actions/checkout@v4", with: job.checkoutWith },
						{ uses: "./.github/actions/prepare" },
						...job.steps,
					],
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
