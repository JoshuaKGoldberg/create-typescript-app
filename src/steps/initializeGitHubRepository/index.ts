import { Octokit } from "octokit";

import { InputValues } from "../../shared/options/readOptions.js";
import { initializeRepositorySettings } from "../initializeRepositorySettings.js";
import { initializeBranchProtectionSettings } from "./initializeBranchProtectionSettings.js";
import { initializeRepositoryLabels } from "./labels/initializeRepositoryLabels.js";

export async function initializeGitHubRepository(
	octokit: Octokit,
	values: InputValues,
) {
	await initializeBranchProtectionSettings(octokit, values);
	await initializeRepositoryLabels();
	await initializeRepositorySettings(octokit, values);
}
