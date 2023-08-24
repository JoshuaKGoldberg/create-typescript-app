import { withSpinner } from "../shared/cli/spinners.js";
import { OctokitAndOptions } from "../shared/options/readOptions.js";
import { clearUnnecessaryFiles } from "../steps/clearUnnecessaryFiles.js";
import { detectExistingContributors } from "../steps/detectExistingContributors.js";
import { finalizeDependencies } from "../steps/finalizeDependencies.js";
import { initializeGitHubRepository } from "../steps/initializeGitHubRepository/index.js";
import { runCommands } from "../steps/runCommands.js";
import { updateAllContributorsTable } from "../steps/updateAllContributorsTable.js";
import { updateLocalFiles } from "../steps/updateLocalFiles.js";
import { writeReadme } from "../steps/writeReadme.js";
import { writeStructure } from "../steps/writing/writeStructure.js";

export async function migrateWithOptions({
	octokit,
	options,
}: OctokitAndOptions) {
	await withSpinner("Migrating repository structure", async () => {
		await clearUnnecessaryFiles();
		await writeStructure(options);
		await writeReadme(options);
		await updateLocalFiles(options);
		await updateAllContributorsTable(options);
	});

	if (octokit) {
		await withSpinner("Initializing GitHub repository", async () => {
			await initializeGitHubRepository(octokit, options);
		});
	}

	if (!options.excludeContributors) {
		await withSpinner(
			"Detecting existing contributors",
			detectExistingContributors,
		);
	}

	if (!options.skipInstall) {
		await withSpinner("Installing packages", async () =>
			finalizeDependencies(options),
		);
	}

	await runCommands("Cleaning up files", [
		"pnpm lint --fix",
		"pnpm format --write",
	]);
}
