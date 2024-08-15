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
		| {
				branches?: string | string[];
				types?: string[];
		  }
		| null
		| string;
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

interface WorkflowFileOptionsBase {
	concurrency?: WorkflowFileConcurrency;
	if?: string;
	name: string;
	on?: WorkflowFileOn;
	permissions?: WorkflowFilePermissions;
}

interface WorkflowFileOptionsRuns extends WorkflowFileOptionsBase {
	runs: (string | WorkflowFileStep)[];
}

interface WorkflowFileOptionsSteps extends WorkflowFileOptionsBase {
	steps: WorkflowFileStep[];
}

type WorkflowFileOptions = WorkflowFileOptionsRuns | WorkflowFileOptionsSteps;

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
			[name.replaceAll(" ", "_").toLowerCase()]: {
				...(options.if && { if: options.if }),
				"runs-on": "ubuntu-latest",
				steps:
					"runs" in options
						? [
								{ uses: "actions/checkout@v4" },
								{ uses: "./.github/actions/prepare" },
								...options.runs.map((run) => ({ run })),
							]
						: options.steps,
			},
		},
		name,
		on,
		permissions,
	});
}
