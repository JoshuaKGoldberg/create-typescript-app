import { InputValues } from "../../../../shared/inputs.js";
import { createDotGitHubActions } from "./actions.js";
import { createDotGitHubIssueTemplate } from "./issueTemplate.js";
import { createDotGitHubFiles } from "./rootFiles.js";
import { createWorkflows } from "./workflows.js";

export function createDotGitHub(values: InputValues) {
	return {
		ISSUE_TEMPLATE: createDotGitHubIssueTemplate(values),
		actions: createDotGitHubActions(),
		workflows: createWorkflows(values),
		...createDotGitHubFiles(values),
	};
}
