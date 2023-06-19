import { $ } from "execa";

export async function readOwnerFromGitRemote(): Promise<string | undefined> {
	const { stdout } = await $`git remote -v`;
	return stdout.match(/origin\s+https:\/\/\S+\.\w+\/([^/]+)/)?.[1];
}
