import { RepositorySettings } from "../../repositorySettings.js";
import { createDotGitHubActions } from "./actions.js";
import { createDotGitHubIssueTemplate } from "./issueTemplate.js";
import { createDotGitHubFiles } from "./rootFiles.js";
import { createWorkflows } from "./workflows.js";

export function createDotGitHub(settings: RepositorySettings) {
	return {
		ISSUE_TEMPLATE: createDotGitHubIssueTemplate(settings),
		actions: createDotGitHubActions(),
		workflows: createWorkflows(settings),
		...createDotGitHubFiles(settings),
	};
}
