import chalk from "chalk";
import { $ } from "execa";

import { Options } from "./types.js";

interface GhUserOutput {
	login: string;
}

export async function getGitHubUserAsAllContributor(
	options: Pick<Options, "offline" | "owner">,
) {
	if (options.offline) {
		console.warn(
			chalk.gray(
				`Skipping populating all-contributors contributions for ${options.owner} because in --offline mode.`,
			),
		);
		return options.owner;
	}

	let user: string;

	try {
		user = (JSON.parse((await $`gh api user`).stdout) as GhUserOutput).login;
	} catch {
		console.warn(
			chalk.gray(
				`Couldn't authenticate GitHub user, falling back to the provided owner name '${options.owner}'.`,
			),
		);
		user = options.owner;
	}

	const contributions = [
		"code",
		"content",
		"doc",
		"ideas",
		"infra",
		"maintenance",
		"projectManagement",
		"tool",
	].join(",");
	await $`npx -y all-contributors-cli@6.25 add ${user} ${contributions}`;

	return user;
}
