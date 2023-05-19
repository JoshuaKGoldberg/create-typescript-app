import { formatYaml } from "../formatters/formatYaml.js";

interface WorkflowFileConcurrency {
	"cancel-in-progress": boolean;
	group: string;
}

interface WorkflowFileOn {
	pull_request?:
		| null
		| string
		| {
				branches?: string | string[];
				types?: string[];
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
					"runs-on": "ubuntu-latest",
					steps:
						"runs" in options
							? [
									{ uses: "actions/checkout@v3" },
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
