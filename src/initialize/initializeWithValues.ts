import { withSpinner } from "../shared/cli/spinners.js";
import { HelpersAndValues } from "../shared/readInputs.js";
import { clearChangelog } from "../steps/clearChangelog.js";
import { initializeGitHubRepository } from "../steps/initializeGitHubRepository/index.js";
import { removeSetupScripts } from "../steps/removeSetupScripts.js";
import { resetGitTags } from "../steps/resetGitTags.js";
import { runCommands } from "../steps/runCommands.js";
import { uninstallPackages } from "../steps/uninstallPackages.js";
import { updateAllContributorsTable } from "../steps/updateAllContributorsTable.js";
import { updateLocalFiles } from "../steps/updateLocalFiles.js";
import { updateReadme } from "../steps/updateReadme.js";
import { addOwnerAsAllContributor } from "./settings/addOwnerAsAllContributor.js";

export async function initializeWithValues({
	octokit,
	values,
}: HelpersAndValues) {
	await withSpinner("Initializing local files", async () => {
		await updateLocalFiles(values);
		await updateReadme();
		await clearChangelog();
		await updateAllContributorsTable(values);
		await resetGitTags();
	});

	if (!values.excludeContributors) {
		await withSpinner("Updating existing contributor details", async () => {
			await addOwnerAsAllContributor(values.owner);
		});
	}

	if (octokit) {
		await withSpinner("Initializing GitHub repository", async () => {
			await initializeGitHubRepository(octokit, values);
		});
	}

	if (!values.skipRemoval) {
		await withSpinner("Removing setup scripts", removeSetupScripts);
	}

	if (!values.skipUninstall) {
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
