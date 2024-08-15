import { withSpinner, withSpinners } from "../shared/cli/spinners.js";
import { createCleanupCommands } from "../shared/createCleanupCommands.js";
import { GitHubAndOptions } from "../shared/options/readOptions.js";
import { addOwnerAsAllContributor } from "../steps/addOwnerAsAllContributor.js";
import { clearChangelog } from "../steps/clearChangelog.js";
import { initializeGitHubRepository } from "../steps/initializeGitHubRepository/index.js";
import { removeSetupScripts } from "../steps/removeSetupScripts.js";
import { resetGitTags } from "../steps/resetGitTags.js";
import { runCleanup } from "../steps/runCleanup.js";
import { uninstallPackages } from "../steps/uninstallPackages.js";
import { updateAllContributorsTable } from "../steps/updateAllContributorsTable.js";
import { updateLocalFiles } from "../steps/updateLocalFiles.js";
import { updateReadme } from "../steps/updateReadme.js";

export async function initializeWithOptions({
	github,
	options,
}: GitHubAndOptions) {
	await withSpinners("Initializing local files", [
		[
			"Updating local files",
			async () => {
				await updateLocalFiles(options);
			},
		],
		[
			"Updating README.md",
			async () => {
				await updateReadme(options);
			},
		],
		["Clearing changelog", clearChangelog],
		[
			"Updating all-contributors table",
			async () => {
				await updateAllContributorsTable(options);
			},
		],
		["Resetting Git tags", resetGitTags],
	]);

	if (!options.excludeAllContributors) {
		await withSpinner("Updating existing contributor details", async () => {
			await addOwnerAsAllContributor(github?.octokit, options);
		});
	}

	if (github) {
		await withSpinner("Initializing GitHub repository", async () => {
			await initializeGitHubRepository(github.octokit, options);
		});
	}

	if (!options.skipRemoval) {
		await withSpinner("Removing setup scripts", removeSetupScripts);
	}

	if (!options.skipUninstall) {
		await withSpinner("Uninstalling initialization-only packages", async () =>
			uninstallPackages(options.offline),
		);
	}

	await runCleanup(
		createCleanupCommands(options.bin, "pnpm dedupe --offline"),
		options.mode,
	);
}
