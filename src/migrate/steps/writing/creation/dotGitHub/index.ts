import { MigrationInputValues } from "../../../../values/types.js";
import { createDotGitHubActions } from "./actions.js";
import { createDotGitHubIssueTemplate } from "./issueTemplate.js";
import { createDotGitHubFiles } from "./rootFiles.js";
import { createWorkflows } from "./workflows.js";

export function createDotGitHub(values: MigrationInputValues) {
	return {
		ISSUE_TEMPLATE: createDotGitHubIssueTemplate(values),
		actions: createDotGitHubActions(),
		workflows: createWorkflows(values),
		...createDotGitHubFiles(values),
	};
}
