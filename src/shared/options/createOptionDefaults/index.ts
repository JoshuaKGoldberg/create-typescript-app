import { $ } from "execa";
import gitRemoteOriginUrl from "git-remote-origin-url";
import gitUrlParse from "git-url-parse";
import lazyValue from "lazy-value";
import * as fs from "node:fs/promises";
import npmUser from "npm-user";

import { readPackageData } from "../../packages.js";
import { tryCatchAsync } from "../../tryCatchAsync.js";
import { tryCatchLazyValueAsync } from "../../tryCatchLazyValueAsync.js";
import { PromptedOptions } from "../../types.js";
import { parsePackageAuthor } from "./parsePackageAuthor.js";
import { readDefaultsFromDevelopment } from "./readDefaultsFromDevelopment.js";
import { readDefaultsFromReadme } from "./readDefaultsFromReadme.js";
import { readGitHubEmail } from "./readGitHubEmail.js";

export function createOptionDefaults(promptedOptions?: PromptedOptions) {
	const gitDefaults = tryCatchLazyValueAsync(async () =>
		gitUrlParse(await gitRemoteOriginUrl()),
	);

	const npmDefaults = tryCatchLazyValueAsync(async () => {
		const whoami = (await $`npm whoami`).stdout;
		return whoami ? await npmUser(whoami) : undefined;
	});

	const packageData = lazyValue(readPackageData);
	const packageAuthor = lazyValue(async () =>
		parsePackageAuthor(await packageData()),
	);

	return {
		author: async () =>
			(await packageAuthor()).author ?? (await npmDefaults())?.name,
		bin: async () => (await packageData()).bin,
		description: async () => (await packageData()).description,
		email: async () => {
			const githubEmail =
				(await readGitHubEmail()) ??
				(await tryCatchAsync(
					async () => (await $`git config --get user.email`).stdout,
				));
			const npmEmail =
				(await npmDefaults())?.email ?? (await packageAuthor()).email;

			/* eslint-disable @typescript-eslint/no-non-null-assertion */
			return githubEmail || npmEmail
				? {
						github: (githubEmail || npmEmail)!,
						npm: (npmEmail || githubEmail)!,
					}
				: undefined;
			/* eslint-enable @typescript-eslint/no-non-null-assertion */
		},
		funding: async () =>
			await tryCatchAsync(async () =>
				(await fs.readFile(".github/FUNDING.yml"))
					.toString()
					.split(":")[1]
					?.trim(),
			),
		owner: async () =>
			(await gitDefaults())?.organization ?? (await packageAuthor()).author,
		repository: async () =>
			promptedOptions?.repository ??
			(await gitDefaults())?.name ??
			(await packageData()).name,
		...readDefaultsFromDevelopment(),
		...readDefaultsFromReadme(),
	};
}
