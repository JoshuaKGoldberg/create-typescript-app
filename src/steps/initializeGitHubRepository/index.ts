import { Octokit } from "octokit";

import { Options } from "../../shared/types.js";
import { initializeRepositorySettings } from "../initializeRepositorySettings.js";
import { initializeBranchProtectionSettings } from "./initializeBranchProtectionSettings.js";
import { initializeRepositoryLabels } from "./labels/initializeRepositoryLabels.js";

export async function initializeGitHubRepository(
	octokit: Octokit,
	options: Options,
) {
	await initializeBranchProtectionSettings(octokit, options);
	await initializeRepositoryLabels();
	await initializeRepositorySettings(octokit, options);
}
