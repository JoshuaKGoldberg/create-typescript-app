import { $ } from "execa";
import gitRemoteOriginUrl from "git-remote-origin-url";
import gitUrlParse from "git-url-parse";
import lazyValue from "lazy-value";
import fs from "node:fs/promises";
import npmUser from "npm-user";

import { readPackageData } from "../../packages.js";
import { tryCatchAsync } from "../../tryCatchAsync.js";
import { tryCatchLazyValueAsync } from "../../tryCatchLazyValueAsync.js";
import { parsePackageAuthor } from "./parsePackageAuthor.js";
import { readTitleFromReadme } from "./readTitleFromReadme.js";

export function getGitAndNpmDefaults() {
	const gitDefaults = tryCatchLazyValueAsync(async () =>
		gitUrlParse(await gitRemoteOriginUrl()),
	);

	const npmDefaults = tryCatchLazyValueAsync(
		async () => await npmUser((await $`npm whoami`).stdout),
	);

	const packageData = lazyValue(readPackageData);
	const packageAuthor = lazyValue(async () =>
		parsePackageAuthor(await packageData()),
	);

	return {
		author: async () => (await packageAuthor()).author ?? npmDefaults.name,
		description: async () => (await packageData()).description,
		email: async () =>
			(await npmDefaults())?.email ??
			(await packageAuthor()).email ??
			(await tryCatchAsync(
				async () => (await $`git config --get user.email`).stdout,
			)),
		funding: async () =>
			await tryCatchAsync(
				async () =>
					(await fs.readFile(".github/FUNDING.yml"))
						.toString()
						.split(":")[1]
						?.trim(),
			),
		owner: async () =>
			(await gitDefaults())?.organization ?? (await packageAuthor()).author,
		repository: async () =>
			(await gitDefaults())?.name ?? (await packageData()).name,
		title: async () => await readTitleFromReadme(),
	};
}
