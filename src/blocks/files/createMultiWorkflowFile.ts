import { z } from "zod";

import { WorkflowsVersions } from "../../schemas.ts";
import { resolveUses } from "../actions/resolveUses.ts";
import { MatrixJob } from "../ci/matrixJobs.ts";
import { createJobName } from "./createJobName.ts";
import { formatWorkflowYaml } from "./formatWorkflowYaml.ts";

export const zMultiWorkflowJobPermissions = z.record(
	z.string(),
	z.enum(["none", "read", "write"]),
);

export interface MultiWorkflowFileOptions {
	jobs: MultiWorkflowJobOptions[];
	matrixJobs?: Record<string, MatrixJob>;
	name: string;
	workflowsVersions: undefined | WorkflowsVersions;
}

export interface MultiWorkflowJobOptions {
	checkoutWith?: Record<string, string>;
	if?: string;
	name: string;
	permissions?: z.infer<typeof zMultiWorkflowJobPermissions>;
	steps: MultiWorkflowJobStep[];
}

export type MultiWorkflowJobStep =
	| ({ env?: Record<string, string>; if?: string; name?: string } & (
			{ run: string } | { uses: string; with?: Record<string, string> }
	  ))
	| { parallel: MultiWorkflowJobStep[] };

export function createMultiWorkflowFile({
	jobs,
	matrixJobs,
	name,
	workflowsVersions,
}: MultiWorkflowFileOptions) {
	return formatWorkflowYaml({
		jobs: {
			...matrixJobs,
			...Object.fromEntries(
				jobs.map((job) => [
					createJobName(job.name),
					{
						if: job.if,
						name: job.name,
						permissions: job.permissions,
						"runs-on": "ubuntu-latest",
						steps: [
							{
								uses: resolveUses(
									"actions/checkout",
									"v7",
									workflowsVersions,
									"3d3c42e5aac5ba805825da76410c181273ba90b1",
								),
								with: {
									"persist-credentials": false,
									...job.checkoutWith,
								},
							},
							{ uses: "./.github/actions/prepare" },
							...job.steps,
						],
					},
				]),
			),
		},
		name,
		on: {
			pull_request: null,
			push: {
				branches: ["main"],
			},
		},
		permissions: {
			contents: "read",
		},
	});
}
