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
import { readDefaultsFromReadme } from "./readDefaultsFromReadme.js";
import { readEmails } from "./readEmails.js";
import { readGuide } from "./readGuide.js";

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
		email: async () => readEmails(npmDefaults, packageAuthor),
		funding: async () =>
			await tryCatchAsync(async () =>
				(await fs.readFile(".github/FUNDING.yml"))
					.toString()
					.split(":")[1]
					?.trim(),
			),
		guide: readGuide,
		owner: async () =>
			(await gitDefaults())?.organization ?? (await packageAuthor()).author,
		repository: async () =>
			promptedOptions?.repository ??
			(await gitDefaults())?.name ??
			(await packageData()).name,
		...readDefaultsFromReadme(),
	};
}
