import { withSpinner } from "../shared/cli/spinners.js";
import { OctokitAndOptions } from "../shared/options/readOptions.js";
import { addOwnerAsAllContributor } from "../steps/addOwnerAsAllContributor.js";
import { clearChangelog } from "../steps/clearChangelog.js";
import { initializeGitHubRepository } from "../steps/initializeGitHubRepository/index.js";
import { removeSetupScripts } from "../steps/removeSetupScripts.js";
import { resetGitTags } from "../steps/resetGitTags.js";
import { runCommands } from "../steps/runCommands.js";
import { uninstallPackages } from "../steps/uninstallPackages.js";
import { updateAllContributorsTable } from "../steps/updateAllContributorsTable.js";
import { updateLocalFiles } from "../steps/updateLocalFiles.js";
import { updateReadme } from "../steps/updateReadme.js";

export async function initializeWithOptions({
	octokit,
	options,
}: OctokitAndOptions) {
	await withSpinner("Initializing local files", async () => {
		await updateLocalFiles(options);
		await updateReadme();
		await clearChangelog();
		await updateAllContributorsTable(options);
		await resetGitTags();
	});

	if (!options.excludeContributors) {
		await withSpinner("Updating existing contributor details", async () => {
			await addOwnerAsAllContributor(options.owner);
		});
	}

	if (octokit) {
		await withSpinner("Initializing GitHub repository", async () => {
			await initializeGitHubRepository(octokit, options);
		});
	}

	if (!options.skipRemoval) {
		await withSpinner("Removing setup scripts", removeSetupScripts);
	}

	if (!options.skipUninstall) {
		await withSpinner(
			"Uninstalling initialization-only packages",
			uninstallPackages,
		);
	}

	await runCommands("Cleaning up files", [
		"pnpm lint --fix",
		"pnpm format --write",
	]);
}
