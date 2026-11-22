import { z } from "zod";

import { WorkflowsVersions } from "../../schemas.ts";
import { resolveUses } from "../actions/resolveUses.ts";
import { createJobName } from "./createJobName.ts";
import { formatWorkflowYaml } from "./formatWorkflowYaml.ts";

export const zMultiWorkflowJobPermissions = z.record(
	z.string(),
	z.enum(["none", "read", "write"]),
);

export interface MultiWorkflowFileOptions {
	jobs: MultiWorkflowJobOptions[];
	name: string;
	workflowsVersions: undefined | WorkflowsVersions;
}

export interface MultiWorkflowJobOptions {
	checkoutWith?: Record<string, string>;
	if?: string;
	name: string;
	permissions?: z.infer<typeof zMultiWorkflowJobPermissions>;
	sequential?: boolean;
	steps: MultiWorkflowJobStep[];
}

export type MultiWorkflowJobStep =
	| ({ env?: Record<string, string>; if?: string; name?: string } & (
			{ run: string } | { uses: string; with?: Record<string, string> }
	  ))
	| { parallel: MultiWorkflowJobStep[] };

export function createMultiWorkflowFile({
	jobs,
	name,
	workflowsVersions,
}: MultiWorkflowFileOptions) {
	return formatWorkflowYaml({
		jobs: Object.fromEntries(
			jobs.map((job) => [
				createJobName(job.name),
				{
					if: job.if,
					name: job.name,
					permissions: job.permissions,
					"runs-on": "ubuntu-latest",
					steps: [
						{
							uses: resolveUses("actions/checkout", "v4", workflowsVersions),
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
