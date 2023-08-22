import { runOrSkip } from "../shared/cli/runOrSkip.js";
import { withSpinner } from "../shared/cli/spinners.js";
import { getNpmAuthor } from "../shared/getNpmAuthor.js";
import { HelpersAndValues } from "../shared/inputs.js";
import { clearUnnecessaryFiles } from "../steps/clearUnnecessaryFiles.js";
import { detectExistingContributors } from "../steps/detectExistingContributors.js";
import { finalizeDependencies } from "../steps/finalizeDependencies.js";
import { initializeBranchProtectionSettings } from "../steps/initializeBranchProtectionSettings.js";
import { initializeRepositorySettings } from "../steps/initializeRepositorySettings.js";
import { initializeRepositoryLabels } from "../steps/labels/initializeRepositoryLabels.js";
import { runCommands } from "../steps/runCommands.js";
import { updateAllContributorsTable } from "../steps/updateAllContributorsTable.js";
import { updateLocalFiles } from "../steps/updateLocalFiles.js";
import { writeReadme } from "../steps/writeReadme.js";
import { writeStructure } from "../steps/writing/writeStructure.js";

export async function migrateWithValues({ octokit, values }: HelpersAndValues) {
	const npmAuthor = await getNpmAuthor(values.owner);

	await withSpinner("Migrating repository structure", async () => {
		await clearUnnecessaryFiles();
		await writeStructure(values);
		await writeReadme(values);
		await updateLocalFiles({ ...values, npmAuthor });
		await updateAllContributorsTable(values);
	});

	await runOrSkip("Initializing API metadata", !octokit, async () => {
		/* eslint-disable @typescript-eslint/no-non-null-assertion */
		await initializeBranchProtectionSettings(octokit!, values);
		await initializeRepositoryLabels();
		await initializeRepositorySettings(octokit!, values);
		/* eslint-enable @typescript-eslint/no-non-null-assertion */
	});

	await runOrSkip(
		"Detecting existing contributors",
		values.skipContributors,
		detectExistingContributors,
	);

	await runOrSkip("Installing packages", values.skipInstall, async () =>
		finalizeDependencies(values),
	);

	await runCommands("Cleaning up files", [
		"pnpm lint --fix",
		"pnpm format --write",
	]);
}
