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
import { readDefaultsFromReadme } from "./readDefaultsFromReadme.js";

export function readOptionDefaults() {
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
		author: async () => (await packageAuthor()).author ?? npmDefaults.name,
		description: async () => (await packageData()).description,
		email: async () => {
			const gitEmail = await tryCatchAsync(
				async () => (await $`git config --get user.email`).stdout,
			);
			const npmEmail =
				(await npmDefaults())?.email ?? (await packageAuthor()).email;

			/* eslint-disable @typescript-eslint/prefer-nullish-coalescing, @typescript-eslint/no-non-null-assertion */
			return gitEmail || npmEmail
				? { github: (gitEmail || npmEmail)!, npm: (npmEmail || gitEmail)! }
				: undefined;
			/* eslint-enable @typescript-eslint/prefer-nullish-coalescing, @typescript-eslint/no-non-null-assertion */
		},
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
		...readDefaultsFromReadme(),
	};
}
