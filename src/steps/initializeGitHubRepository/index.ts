import { Octokit } from "octokit";
import { setGitHubRepositoryLabels } from "set-github-repository-labels";

import { Options } from "../../shared/types.js";
import { initializeGitRemote } from "../initializeGitRemote.js";
import { initializeRepositorySettings } from "../initializeRepositorySettings.js";
import { initializeBranchProtectionSettings } from "./initializeBranchProtectionSettings.js";
import { outcomeLabels } from "./outcomeLabels.js";

export async function initializeGitHubRepository(
	octokit: Octokit,
	options: Options,
) {
	await initializeGitRemote(options);
	await initializeRepositorySettings(octokit, options);
	await initializeBranchProtectionSettings(octokit, options);
	await setGitHubRepositoryLabels({
		labels: outcomeLabels,
		owner: options.owner,
		repository: options.repository,
	});
}
