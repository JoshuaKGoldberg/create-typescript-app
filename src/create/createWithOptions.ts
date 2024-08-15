import { $ } from "execa";

import { withSpinner, withSpinners } from "../shared/cli/spinners.js";
import { createCleanupCommands } from "../shared/createCleanupCommands.js";
import { doesRepositoryExist } from "../shared/doesRepositoryExist.js";
import { GitHubAndOptions } from "../shared/options/readOptions.js";
import { addToolAllContributors } from "../steps/addToolAllContributors.js";
import { clearLocalGitTags } from "../steps/clearLocalGitTags.js";
import { finalizeDependencies } from "../steps/finalizeDependencies.js";
import { initializeGitHubRepository } from "../steps/initializeGitHubRepository/index.js";
import { populateCSpellDictionary } from "../steps/populateCSpellDictionary.js";
import { runCleanup } from "../steps/runCleanup.js";
import { writeReadme } from "../steps/writeReadme/index.js";
import { writeStructure } from "../steps/writing/writeStructure.js";

export async function createWithOptions({ github, options }: GitHubAndOptions) {
	await withSpinners("Creating repository structure", [
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
	]);

	if (!options.excludeAllContributors && !options.skipAllContributorsApi) {
		await withSpinner("Adding contributors to table", async () => {
			await addToolAllContributors(github?.octokit, options);
		});
	}

	if (!options.skipInstall) {
		await withSpinner("Installing packages", async () =>
			finalizeDependencies(options),
		);

		if (!options.excludeLintSpelling) {
			await withSpinner(
				"Populating CSpell dictionary",
				populateCSpellDictionary,
			);
		}

		await runCleanup(createCleanupCommands(options.bin), options.mode);
	}

	await withSpinner("Clearing any local Git tags", clearLocalGitTags);

	const sendToGitHub =
		github && (await doesRepositoryExist(github.octokit, options));

	if (sendToGitHub) {
		await withSpinner("Initializing GitHub repository", async () => {
			await $`git remote add origin https://github.com/${options.owner}/${options.repository}`;
			await $`git add -A`;
			await $`git commit --message ${"feat: initialized repo ✨"} --no-gpg-sign`;
			await $`git push -u origin main --force`;
			await initializeGitHubRepository(github.octokit, options);
		});
	}

	return { sentToGitHub: sendToGitHub };
}
