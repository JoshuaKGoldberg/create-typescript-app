import { createJobName } from "./createJobName.js";
import { formatWorkflowYaml } from "./formatWorkflowYaml.js";

interface CallerWorkflowFileOn {
	issue_comment?: {
		types: string[];
	};
	pull_request?: null | {
		types?: string[];
	};
	workflow_run?: {
		types: string[];
		workflows: string[];
	};
}

interface CallerWorkflowFileOptions {
	jobName: string;
	name: string;
	on: CallerWorkflowFileOn;
	permissions?: CallerWorkflowFilePermissions;
	secrets?: Record<string, string>;
	uses: string;
	with?: Record<string, string>;
}

interface CallerWorkflowFilePermissions {
	actions?: string;
	contents?: string;
	issues?: string;
	"pull-requests"?: string;
}

export function createCallerWorkflowFile({
	jobName,
	name,
	on,
	permissions,
	secrets,
	uses,
	with: withValues,
}: CallerWorkflowFileOptions) {
	return formatWorkflowYaml({
		jobs: {
			[createJobName(jobName)]: {
				permissions,
				secrets,
				uses,
				with: withValues,
			},
		},
		name,
		on,
	});
}
