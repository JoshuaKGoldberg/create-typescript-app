import { withSpinner } from "../shared/cli/spinners.js";
import { HelpersAndValues } from "../shared/readInputs.js";
import { clearUnnecessaryFiles } from "../steps/clearUnnecessaryFiles.js";
import { detectExistingContributors } from "../steps/detectExistingContributors.js";
import { finalizeDependencies } from "../steps/finalizeDependencies.js";
import { initializeGitHubRepository } from "../steps/initializeGitHubRepository/index.js";
import { runCommands } from "../steps/runCommands.js";
import { updateAllContributorsTable } from "../steps/updateAllContributorsTable.js";
import { updateLocalFiles } from "../steps/updateLocalFiles.js";
import { writeReadme } from "../steps/writeReadme.js";
import { writeStructure } from "../steps/writing/writeStructure.js";

export async function migrateWithValues({ octokit, values }: HelpersAndValues) {
	await withSpinner("Migrating repository structure", async () => {
		await clearUnnecessaryFiles();
		await writeStructure(values);
		await writeReadme(values);
		await updateLocalFiles(values);
		await updateAllContributorsTable(values);
	});

	if (octokit) {
		await withSpinner("Initializing GitHub repository", async () => {
			await initializeGitHubRepository(octokit, values);
		});
	}

	if (!values.excludeContributors) {
		await withSpinner(
			"Detecting existing contributors",
			detectExistingContributors,
		);
	}

	if (!values.skipInstall) {
		await withSpinner("Installing packages", async () =>
			finalizeDependencies(values),
		);
	}

	await runCommands("Cleaning up files", [
		"pnpm lint --fix",
		"pnpm format --write",
	]);
}
