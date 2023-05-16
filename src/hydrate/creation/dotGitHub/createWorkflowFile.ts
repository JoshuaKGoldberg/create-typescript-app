import jsYaml from "js-yaml";

export interface WorkflowFileConcurrency {
	"cancel-in-progress": boolean;
	group: string;
}

export interface WorkflowFileOn {
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

export interface WorkflowFilePermissions {
	contents?: string;
	"pull-requests"?: string;
}

export interface WorkflowFileStep {
	env?: Record<string, string>;
	if?: string;
	name?: string;
	run?: string;
	uses?: string;
	with?: Record<string, unknown>;
}

export interface WorkflowFileOptionsBase {
	concurrency?: WorkflowFileConcurrency;
	name: string;
	on?: WorkflowFileOn;
	permissions?: WorkflowFilePermissions;
}

export interface WorkflowFileOptionsRuns extends WorkflowFileOptionsBase {
	runs: (string | WorkflowFileStep)[];
}

export interface WorkflowFileOptionsSteps extends WorkflowFileOptionsBase {
	steps: WorkflowFileStep[];
}

export type WorkflowFileOptions =
	| WorkflowFileOptionsRuns
	| WorkflowFileOptionsSteps;

export function createWorkflowFile({
	name,
	on = {
		pull_request: null,
		push: {
			branches: ["main"],
		},
	},
	...options
}: WorkflowFileOptions) {
	return (
		jsYaml
			.dump(
				{
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
				},
				{
					lineWidth: -1,
					noCompatMode: true,
					sortKeys: true,
					styles: {
						"!!null": "canonical",
					},
					// https://github.com/nodeca/js-yaml/pull/515
					replacer(_, value: unknown) {
						if (typeof value !== "string" || !value.includes("\n\t\t")) {
							return value;
						}

						return value
							.replaceAll("\n\t  \t\t\t", "")
							.replaceAll(/\n\t\t\t\t\t\t$/g, "");
					},
				}
			)
			.replaceAll(/\n(\S)/g, "\n\n$1")
			// https://github.com/nodeca/js-yaml/pull/515
			.replaceAll(/: "\\n(.+)"/g, ": |\n$1")
			.replaceAll("\\n", "\n")
			.replaceAll("\\t", "  ")
	);
}
