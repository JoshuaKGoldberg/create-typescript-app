import { createSchema, SchemaOptionsFor } from "create";
import { $ } from "execa";
import gitRemoteOriginUrl from "git-remote-origin-url";
import gitUrlParse from "git-url-parse";
import lazyValue from "lazy-value";
import npmUser from "npm-user";
import { z } from "zod";

import { parsePackageAuthor } from "../shared/options/createOptionDefaults/parsePackageAuthor.js";
import { readDefaultsFromReadme } from "../shared/options/createOptionDefaults/readDefaultsFromReadme.js";
import { readEmails } from "../shared/options/createOptionDefaults/readEmails.js";
import { readFunding } from "../shared/options/createOptionDefaults/readFunding.js";
import { readGuide } from "../shared/options/createOptionDefaults/readGuide.js";
import { readPackageData } from "../shared/packages.js";
import { tryCatchLazyValueAsync } from "../shared/tryCatchLazyValueAsync.js";

export const schema = createSchema({
	options: {
		access: z.union([z.literal("public"), z.literal("restricted")]).optional(),
		author: z.string().optional(),
		bin: z.string().optional(),
		description: z.string(),
		email: z
			.union([
				z.string(),
				z.object({
					github: z.string(),
					npm: z.string(),
				}),
			])
			.transform((email) =>
				typeof email === "string" ? { github: email, npm: email } : email,
			),
		funding: z.string().optional(),
		guide: z
			.object({
				href: z.string(),
				title: z.string(),
			})
			.optional(),
		keywords: z.array(z.string()).optional(),
		login: z.string().optional(),
		logo: z
			.object({
				alt: z.string(),
				src: z.string(),
			})
			.optional(),
		node: z
			.object({
				minimum: z.string(),
				pinned: z.string().optional(),
			})
			.optional(),
		owner: z.string(),
		preserveGeneratedFrom: z.boolean().optional(),
		repository: z.string(),
		title: z.string(),
		version: z.string().optional(),
	},
	produce({ options }) {
		const gitDefaults = tryCatchLazyValueAsync(async () =>
			gitUrlParse(await gitRemoteOriginUrl()),
		);

		const npmDefaults = tryCatchLazyValueAsync(async () => {
			const whoami = (await $(`npm whoami`)).stdout;
			return whoami ? await npmUser(whoami) : undefined;
		});

		const packageData = lazyValue(readPackageData);
		const packageAuthor = lazyValue(async () =>
			parsePackageAuthor(await packageData()),
		);

		const author = lazyValue(async () =>
			(
				(await packageAuthor()).author ??
				(await npmDefaults())?.name ??
				options.owner
			)?.toLowerCase(),
		);

		return {
			author,
			bin: async () => (await packageData()).bin,
			description: async () => (await packageData()).description,
			email: async () => readEmails(npmDefaults, packageAuthor),
			funding: readFunding,
			guide: readGuide,
			login: author,
			node: () => ({ minimum: "18.3.0" }),
			owner: async () =>
				(await gitDefaults())?.organization ?? (await packageAuthor()).author,
			repository: async () =>
				options.repository ??
				(await gitDefaults())?.name ??
				(await packageData()).name,
			...readDefaultsFromReadme(),
		};
	},
});

export type SchemaOptions = SchemaOptionsFor<typeof schema>;
