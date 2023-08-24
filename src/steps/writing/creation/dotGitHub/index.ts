import { InputValues } from "../../../../shared/options/readOptions.js";
import { createDotGitHubActions } from "./actions.js";
import { createDotGitHubFiles } from "./createDotGitHubFiles.js";
import { createDotGitHubIssueTemplate } from "./issueTemplate.js";
import { createWorkflows } from "./workflows.js";

export async function createDotGitHub(values: InputValues) {
	return {
		ISSUE_TEMPLATE: createDotGitHubIssueTemplate(values),
		actions: createDotGitHubActions(),
		workflows: createWorkflows(values),
		...(await createDotGitHubFiles(values)),
	};
}
