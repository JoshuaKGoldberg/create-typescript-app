import { $ } from "execa";
import { UserInfo } from "npm-user";

import { tryCatchAsync } from "../utils/tryCatchAsync.js";
import { readGitHubEmail } from "./readGitHubEmail.js";

export async function readEmails(
	npmDefaults: () => Promise<undefined | UserInfo>,
	packageAuthor: () => Promise<{
		author: string | undefined;
		email: string | undefined;
	}>,
) {
	const github =
		(await readGitHubEmail()) ??
		(await tryCatchAsync(
			async () => (await $`git config --get user.email`).stdout,
		));

	const npm =
		((await npmDefaults())?.email ?? (await packageAuthor()).email) || github;

	return npm ? { github: github || npm, npm } : undefined;
}
