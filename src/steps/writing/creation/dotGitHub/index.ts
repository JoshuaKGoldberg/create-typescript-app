import { Options } from "../../../../shared/types.js";
import { createDotGitHubActions } from "./actions.js";
import { createDotGitHubFiles } from "./createDotGitHubFiles.js";
import { createWorkflows } from "./createWorkflows.js";
import { createDotGitHubIssueTemplate } from "./issueTemplate.js";

export async function createDotGitHub(options: Options) {
	return {
		actions: createDotGitHubActions(),
		ISSUE_TEMPLATE: createDotGitHubIssueTemplate(options),
		workflows: createWorkflows(options),
		...(await createDotGitHubFiles(options)),
	};
}
