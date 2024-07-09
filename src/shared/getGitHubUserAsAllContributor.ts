import chalk from "chalk";
import { $ } from "execa";
import { Octokit } from "octokit";

import { Options } from "./types.js";

export async function getGitHubUserAsAllContributor(
	octokit: Octokit | undefined,
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

	if (octokit) {
		try {
			user = (await octokit.rest.users.getAuthenticated()).data.login;
		} catch {
			console.warn(
				chalk.gray(
					`Couldn't authenticate GitHub user, falling back to the provided owner name '${options.owner}'.`,
				),
			);
			user = options.owner;
		}
	} else {
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
