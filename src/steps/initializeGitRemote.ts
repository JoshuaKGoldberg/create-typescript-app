import { $ } from "execa";

import { Options } from "../shared/types.js";

type InitializeRepositorySettings = Pick<Options, "owner" | "repository">;

export async function initializeGitRemote({
	owner,
	repository,
}: InitializeRepositorySettings) {
	const remotes = (await $`git remote`).stdout.trim().split("\n");

	if (!remotes.includes("origin")) {
		await $`git remote add origin https://github.com/${owner}/${repository}`;
		await $`git fetch`;
	}
}
