import { execaCommand } from "execa";

export async function clearLocalGitTags() {
	const tags = await execaCommand("git tag -l");

	await execaCommand(`git tag -d ${tags.stdout.replaceAll("\n", " ")}`);
}
