import * as prompts from "@clack/prompts";
import { $ } from "execa";

import { runOrSkip } from "../shared/cli/runOrSkip.js";
import { withSpinner } from "../shared/cli/spinners.js";
import { doesRepositoryExist } from "../shared/doesRepositoryExist.js";
import { HelpersAndValues } from "../shared/inputs.js";
import { finalizeDependencies } from "../steps/finalizeDependencies.js";
import { initializeBranchProtectionSettings } from "../steps/initializeBranchProtectionSettings.js";
import { initializeRepositorySettings } from "../steps/initializeRepositorySettings.js";
import { initializeRepositoryLabels } from "../steps/labels/initializeRepositoryLabels.js";
import { runCommands } from "../steps/runCommands.js";
import { writeReadme } from "../steps/writeReadme.js";
import { writeStructure } from "../steps/writing/writeStructure.js";
import { addAllContributors } from "./addAllContributors.js";

export async function createWithValues(input: HelpersAndValues) {
	await withSpinner("Creating repository structure", async () => {
		await writeStructure(input.values);
		await writeReadme(input.values);
	});

	await runOrSkip(
		"Adding contributors to table",
		input.values.skipContributors,
		async () => {
			await addAllContributors(input.values.owner);
		},
	);

	await runOrSkip("Installing packages", input.values.skipInstall, async () =>
		finalizeDependencies(input.values),
	);

	await runCommands("Cleaning up files", [
		"pnpm dedupe",
		"pnpm format --write",
		"pnpm lint --fix",
	]);

	const sendToGitHub =
		input.octokit &&
		(await doesRepositoryExist(input.octokit, input.values)) &&
		(input.values.createRepository ??
			(await prompts.confirm({
				message:
					"Would you like to push the template's tooling up to the repository on GitHub?",
			})) === true);

	await runOrSkip("Initializing API metadata", !sendToGitHub, async () => {
		await $`git remote add origin https://github.com/${input.values.owner}/${input.values.repository}`;
		await $`git add -A`;
		await $`git commit --message ${"chore: initialized repo ✨"}`;
		await $`git push -u origin main --force`;

		/* eslint-disable @typescript-eslint/no-non-null-assertion */
		await initializeBranchProtectionSettings(input.octokit!, input.values);
		await initializeRepositoryLabels();
		await initializeRepositorySettings(input.octokit!, input.values);
		/* eslint-enable @typescript-eslint/no-non-null-assertion */
	});

	return { sentToGitHub: sendToGitHub };
}
