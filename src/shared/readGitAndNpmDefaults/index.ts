import { $ } from "execa";
import gitRemoteOriginUrl from "git-remote-origin-url";
import gitUrlParse from "git-url-parse";
import fs from "node:fs/promises";
import npmUser from "npm-user";

import { readPackageData } from "../packages.js";
import { tryCatchAsync } from "../tryCatchAsync.js";
import { readTitleFromReadme } from "./readTitleFromReadme.js";

export async function getGitAndNpmDefaults() {
	const gitDefaults = await tryCatchAsync(async () =>
		gitUrlParse(await gitRemoteOriginUrl()),
	);

	const npmDefaults = await tryCatchAsync(
		async () => await npmUser((await $`npm whoami`).stdout),
	);

	const packageData = await readPackageData();

	const [packageAuthor, packageEmail] =
		typeof packageData.author === "string"
			? [
					packageData.author.split("<")[0].trim(),
					packageData.author.split(/<|>/)[1].trim(),
			  ]
			: [packageData.author?.name, packageData.author?.email];

	return {
		author: packageAuthor,
		description: packageData.description,
		email:
			npmDefaults?.email ??
			packageEmail ??
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
		owner: gitDefaults?.organization ?? packageAuthor,
		repository: gitDefaults?.name ?? packageData.name,
		title: await readTitleFromReadme(),
	};
}
