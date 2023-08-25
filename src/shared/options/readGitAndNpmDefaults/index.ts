import { $ } from "execa";
import gitRemoteOriginUrl from "git-remote-origin-url";
import gitUrlParse from "git-url-parse";
import fs from "node:fs/promises";
import npmUser from "npm-user";

import { readPackageData } from "../../packages.js";
import { tryCatchAsync } from "../../tryCatchAsync.js";
import { parsePackageAuthor } from "./parsePackageAuthor.js";
import { readTitleFromReadme } from "./readTitleFromReadme.js";

export async function getGitAndNpmDefaults() {
	const gitDefaults = await tryCatchAsync(async () =>
		gitUrlParse(await gitRemoteOriginUrl()),
	);

	const npmDefaults = await tryCatchAsync(
		async () => await npmUser((await $`npm whoami`).stdout),
	);

	const packageData = await readPackageData();
	const packageAuthor = parsePackageAuthor(packageData);

	return {
		author: packageAuthor.author ?? npmDefaults?.name,
		description: packageData.description,
		email:
			npmDefaults?.email ??
			packageAuthor.email ??
			(await tryCatchAsync(
				async () => (await $`git config --get user.email`).stdout,
			)),
		funding: await tryCatchAsync(
			async () =>
				(await fs.readFile(".github/FUNDING.yml"))
					.toString()
					.split(":")[1]
					?.trim(),
		),
		owner: gitDefaults?.organization ?? packageAuthor.author,
		repository: gitDefaults?.name ?? packageData.name,
		title: await readTitleFromReadme(),
	};
}
