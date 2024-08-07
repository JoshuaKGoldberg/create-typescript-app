import { formatYaml } from "../formatters/formatYaml.js";

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

export function createWorkflowFile({
	concurrency,
	name,
	on = {
		pull_request: null,
		push: {
			branches: ["main"],
		},
	},
	permissions,
	...options
}: WorkflowFileOptions) {
	return (
		formatYaml({
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
		})
			.replaceAll(/\n(\S)/g, "\n\n$1")
			// https://github.com/nodeca/js-yaml/pull/515
			.replaceAll(/: "\\n(.+)"/g, ": |\n$1")
			.replaceAll("\\n", "\n")
			.replaceAll("\\t", "  ")
	);
}
