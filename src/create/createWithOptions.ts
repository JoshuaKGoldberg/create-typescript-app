import { $ } from "execa";

import { withSpinner, withSpinners } from "../shared/cli/spinners.js";
import { doesRepositoryExist } from "../shared/doesRepositoryExist.js";
import { GitHubAndOptions } from "../shared/options/readOptions.js";
import { addToolAllContributors } from "../steps/addToolAllContributors.js";
import { finalizeDependencies } from "../steps/finalizeDependencies.js";
import { initializeGitHubRepository } from "../steps/initializeGitHubRepository/index.js";
import { runCommands } from "../steps/runCommands.js";
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
			await addToolAllContributors(options);
		});
	}

	if (!options.skipInstall) {
		await withSpinner("Installing packages", async () =>
			finalizeDependencies(options),
		);
	}

	await runCommands("Cleaning up files", [
		"pnpm dedupe",
		"pnpm lint --fix",
		"pnpm format --write",
	]);

	const sendToGitHub =
		github && (await doesRepositoryExist(github.octokit, options));

	if (sendToGitHub) {
		await withSpinner("Initializing GitHub repository", async () => {
			console.log(
				"git remote",
				await $`git remote add origin https://github.com/${options.owner}/${options.repository}`,
			);
			console.log("git add", await $`git add -A`);
			console.log(
				"git commit",
				await $`git commit --message ${"feat: initialized repo ✨"}`,
			);
			console.log("git push", await $`git push -u origin main --force`);
			await initializeGitHubRepository(github.octokit, options);
		});
	}

	return { sentToGitHub: sendToGitHub };
}
