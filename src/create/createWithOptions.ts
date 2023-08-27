import * as prompts from "@clack/prompts";
import { $ } from "execa";

import { withSpinner, withSpinners } from "../shared/cli/spinners.js";
import { doesRepositoryExist } from "../shared/doesRepositoryExist.js";
import { OctokitAndOptions } from "../shared/options/readOptions.js";
import { addToolAllContributors } from "../steps/addToolAllContributors.js";
import { finalizeDependencies } from "../steps/finalizeDependencies.js";
import { initializeGitHubRepository } from "../steps/initializeGitHubRepository/index.js";
import { runCommands } from "../steps/runCommands.js";
import { writeReadme } from "../steps/writeReadme.js";
import { writeStructure } from "../steps/writing/writeStructure.js";

export async function createWithOptions({
	octokit,
	options,
}: OctokitAndOptions) {
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

	if (!options.excludeContributors) {
		await withSpinner("Adding contributors to table", async () => {
			await addToolAllContributors(options.owner);
		});
	}

	if (!options.skipInstall) {
		await withSpinner("Installing packages", async () =>
			finalizeDependencies(options),
		);
	}

	await runCommands("Cleaning up files", [
		"pnpm dedupe",
		"pnpm format --write",
		"pnpm lint --fix",
	]);

	const sendToGitHub =
		octokit &&
		(await doesRepositoryExist(octokit, options)) &&
		(options.createRepository ??
			(await prompts.confirm({
				message:
					"Would you like to push the template's tooling up to the repository on GitHub?",
			})) === true);

	if (sendToGitHub) {
		await withSpinner("Initializing GitHub repository", async () => {
			await $`git remote add origin https://github.com/${options.owner}/${options.repository}`;
			await $`git add -A`;
			await $`git commit --message ${"feat: initialized repo ✨"}`;
			await $`git push -u origin main --force`;
			await initializeGitHubRepository(octokit, options);
		});
	}

	return { sentToGitHub: sendToGitHub };
}
