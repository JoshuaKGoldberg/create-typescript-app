import { createJobName } from "./createJobName.js";
import { formatWorkflowYaml } from "./formatWorkflowYaml.js";

interface WorkflowFileConcurrency {
	"cancel-in-progress"?: boolean;
	group: string;
}

interface WorkflowFileOn {
	issue_comment?: {
		types?: string[];
	};
	issues?: {
		types?: string[];
	};
	pull_request?:
		| null
		| string
		| {
				branches?: string | string[];
				types?: string[];
		  };
	pull_request_target?: {
		types: string[];
	};
	push?: {
		branches: string[];
	};
	release?: {
		types: string[];
	};
	workflow_dispatch?: null | string;
}
interface WorkflowFileOptions {
	concurrency?: WorkflowFileConcurrency;
	if?: string;
	name: string;
	on?: WorkflowFileOn;
	permissions?: WorkflowFilePermissions;
	steps: WorkflowFileStep[];
}

interface WorkflowFilePermissions {
	contents?: string;
	"id-token"?: string;
	issues?: string;
	"pull-requests"?: string;
}

interface WorkflowFileStep {
	env?: Record<string, string>;
	if?: string;
	name?: string;
	run?: string;
	uses?: string;
	with?: Record<string, unknown>;
}

export function createSoloWorkflowFile({
	concurrency,
	name,
	on,
	permissions,
	...options
}: WorkflowFileOptions) {
	return formatWorkflowYaml({
		concurrency,
		jobs: {
			[createJobName(name)]: {
				...(options.if && { if: options.if }),
				"runs-on": "ubuntu-latest",
				steps: options.steps,
			},
		},
		name,
		on,
		permissions,
	});
}
