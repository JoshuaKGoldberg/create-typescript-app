import { withSpinner, withSpinners } from "../shared/cli/spinners.js";
import { GitHubAndOptions } from "../shared/options/readOptions.js";
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
	github,
	options,
}: GitHubAndOptions) {
	await withSpinners("Migrating repository structure", [
		["Clearing unnecessary files", clearUnnecessaryFiles],
		[
			"Writing structure",
			async () => {
				await writeStructure(options);
			},
		],
		[
			"Writing README.md",
			async () => {
				await writeReadme(options);
			},
		],
		[
			"Updating local files",
			async () => {
				await updateLocalFiles(options);
			},
		],
		[
			"Updating all-contributors table",
			async () => {
				await updateAllContributorsTable(options);
			},
		],
	]);

	if (github) {
		await withSpinner("Initializing GitHub repository", async () => {
			await initializeGitHubRepository(github.octokit, options);
		});
	}

	if (!options.excludeContributors) {
		await withSpinner("Detecting existing contributors", async () =>
			detectExistingContributors(github?.auth, options),
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
