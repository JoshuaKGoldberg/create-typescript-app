import { Options } from "../../../../shared/types.js";
import { createDotGitHubActions } from "./actions.js";
import { createDotGitHubFiles } from "./createDotGitHubFiles.js";
import { createDotGitHubIssueTemplate } from "./issueTemplate.js";
import { createWorkflows } from "./workflows.js";

export async function createDotGitHub(options: Options) {
	return {
		ISSUE_TEMPLATE: createDotGitHubIssueTemplate(options),
		actions: createDotGitHubActions(),
		workflows: createWorkflows(options),
		...(await createDotGitHubFiles(options)),
	};
}
