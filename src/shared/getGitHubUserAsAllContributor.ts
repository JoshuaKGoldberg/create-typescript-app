import chalk from "chalk";
import { $ } from "execa";

interface GhUserOutput {
	login: string;
}

export async function getGitHubUserAsAllContributor(owner: string) {
	let user: string;
	try {
		user = (JSON.parse((await $`gh api user`).stdout) as GhUserOutput).login;
	} catch {
		console.warn(
			chalk.gray(
				`Couldn't authenticate GitHub user, falling back to the provided owner name '${owner}'.`,
			),
		);
		user = owner;
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
