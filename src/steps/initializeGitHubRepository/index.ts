import { Octokit } from "octokit";

import { Options } from "../../shared/types.js";
import { initializeGitRemote } from "../initializeGitRemote.js";
import { initializeRepositorySettings } from "../initializeRepositorySettings.js";
import { initializeBranchProtectionSettings } from "./initializeBranchProtectionSettings.js";
import { initializeRepositoryLabels } from "./labels/initializeRepositoryLabels.js";

export async function initializeGitHubRepository(
	octokit: Octokit,
	options: Options,
) {
	await initializeGitRemote(options);
	await initializeRepositorySettings(octokit, options);
	await initializeBranchProtectionSettings(octokit, options);
	await initializeRepositoryLabels(octokit, options);
}
