import * as prompts from "@clack/prompts";
import { $ } from "execa";

import { withSpinner } from "../shared/cli/spinners.js";
import { doesRepositoryExist } from "../shared/doesRepositoryExist.js";
import { HelpersAndValues } from "../shared/options/readOptions.js";
import { finalizeDependencies } from "../steps/finalizeDependencies.js";
import { initializeGitHubRepository } from "../steps/initializeGitHubRepository/index.js";
import { runCommands } from "../steps/runCommands.js";
import { writeReadme } from "../steps/writeReadme.js";
import { writeStructure } from "../steps/writing/writeStructure.js";
import { addAllContributors } from "./addAllContributors.js";

export async function createWithValues({ octokit, values }: HelpersAndValues) {
	await withSpinner("Creating repository structure", async () => {
		await writeStructure(values);
		await writeReadme(values);
	});

	if (!values.excludeContributors) {
		await withSpinner("Adding contributors to table", async () => {
			await addAllContributors(values.owner);
		});
	}

	if (!values.skipInstall) {
		await withSpinner("Installing packages", async () =>
			finalizeDependencies(values),
		);
	}

	await runCommands("Cleaning up files", [
		"pnpm dedupe",
		"pnpm format --write",
		"pnpm lint --fix",
	]);

	const sendToGitHub =
		octokit &&
		(await doesRepositoryExist(octokit, values)) &&
		(values.createRepository ??
			(await prompts.confirm({
				message:
					"Would you like to push the template's tooling up to the repository on GitHub?",
			})) === true);

	if (sendToGitHub) {
		await withSpinner("Initializing GitHub repository", async () => {
			await $`git remote add origin https://github.com/${values.owner}/${values.repository}`;
			await $`git add -A`;
			await $`git commit --message ${"chore: initialized repo ✨"}`;
			await $`git push -u origin main --force`;
			await initializeGitHubRepository(octokit, values);
		});
	}

	return { sentToGitHub: sendToGitHub };
}
