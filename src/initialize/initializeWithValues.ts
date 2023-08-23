import { runOrSkip } from "../shared/cli/runOrSkip.js";
import { withSpinner } from "../shared/cli/spinners.js";
import { getNpmAuthor } from "../shared/getNpmAuthor.js";
import { HelpersAndValues } from "../shared/inputs.js";
import { clearChangelog } from "../steps/clearChangelog.js";
import { initializeBranchProtectionSettings } from "../steps/initializeBranchProtectionSettings.js";
import { initializeRepositorySettings } from "../steps/initializeRepositorySettings.js";
import { initializeRepositoryLabels } from "../steps/labels/initializeRepositoryLabels.js";
import { removeSetupScripts } from "../steps/removeSetupScripts.js";
import { resetGitTags } from "../steps/resetGitTags.js";
import { runCommands } from "../steps/runCommands.js";
import { uninstallPackages } from "../steps/uninstallPackages.js";
import { updateAllContributorsTable } from "../steps/updateAllContributorsTable.js";
import { updateLocalFiles } from "../steps/updateLocalFiles.js";
import { updateReadme } from "../steps/updateReadme.js";
import { addOwnerAsAllContributor } from "./settings/addOwnerAsAllContributor.js";

export async function initializeWithValues(input: HelpersAndValues) {
	const npmAuthor = await getNpmAuthor(input.values.owner);

	await withSpinner("Initializing local files", async () => {
		await updateLocalFiles({ ...input.values, npmAuthor });
		await updateReadme();
		await clearChangelog();
		await updateAllContributorsTable(input.values);
		await resetGitTags();
	});

	await runOrSkip(
		"Updating existing contributor details",
		input.values.skipContributors,
		async () => {
			await addOwnerAsAllContributor(input.values.owner);
		},
	);

	await runOrSkip("Initializing API metadata", !input.octokit, async () => {
		/* eslint-disable @typescript-eslint/no-non-null-assertion */
		await initializeBranchProtectionSettings(input.octokit!, input.values);
		await initializeRepositoryLabels();
		await initializeRepositorySettings(input.octokit!, input.values);
		/* eslint-enable @typescript-eslint/no-non-null-assertion */
	});

	await runOrSkip(
		"Removing setup scripts",
		input.values.skipRemoval,
		removeSetupScripts,
	);

	await runOrSkip(
		"Uninstalling initialization-only packages",
		input.values.skipUninstall,
		uninstallPackages,
	);

	await runCommands("Cleaning up files", [
		"pnpm lint --fix",
		"pnpm format --write",
	]);
}
