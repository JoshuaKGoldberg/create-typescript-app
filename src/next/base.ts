import { BaseOptionsFor, createBase } from "create";
import { execaCommand } from "execa";
import gitRemoteOriginUrl from "git-remote-origin-url";
import gitUrlParse from "git-url-parse";
import { inputFromFile } from "input-from-file";
import { inputFromFileJSON } from "input-from-file-json";
import { inputFromScript } from "input-from-script";
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
import { AllContributorsData } from "../shared/types.js";
import { readDescription } from "./readDescription.js";
import { readDocumentation } from "./readDocumentation.js";
import { swallowError } from "./utils/swallowError.js";

export const base = createBase({
	options: {
		access: z
			.union([z.literal("public"), z.literal("restricted")])
			.optional()
			.describe("which `npm publish --access` to release npm packages with"),
		author: z
			.string()
			.optional()
			.describe("username on npm to publish packages under"),
		bin: z
			.string()
			.optional()
			.describe('value to set in `package.json`\'s `"bin"` property.'),
		contributors: z
			.array(
				z.object({
					avatar_url: z.string(),
					contributions: z.array(z.string()),
					login: z.string(),
					name: z.string(),
					profile: z.string(),
				}),
			)
			.optional()
			.describe("AllContributors contributors to store in .all-contributorsrc"),
		description: z
			.string()
			.describe("sentence case description of the repository"),
		directory: z.string(),
		documentation: z
			.string()
			.optional()
			.describe("any additional docs to add to .github/DEVELOPMENT.md"),
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
			)
			.describe(
				"email address to be listed as the point of contact in docs and packages",
			),
		funding: z
			.string()
			.optional()
			.describe("GitHub organization or username to mention in `funding.yml`"),
		guide: z
			.object({
				href: z.string(),
				title: z.string(),
			})
			.optional()
			.describe(
				"link to a contribution guide to place at the top of development docs",
			),
		hideTemplatedBy: z
			.boolean()
			.optional()
			.describe(
				"whether to hide the 'created by ...' notice at the bottom of the README.md",
			),
		keywords: z
			.array(z.string())
			.optional()
			.describe("any number of keywords to include in `package.json`"),
		logo: z
			.object({
				alt: z.string(),
				src: z.string(),
			})
			.optional()
			.describe(
				"local image file in the repository to display near the top of the README.md",
			),
		node: z
			.object({
				minimum: z.string(),
				pinned: z.string().optional(),
			})
			.optional()
			.describe("node.js engine version(s) to pin and require a minimum of"),
		owner: z
			.string()
			.describe("GitHub organization or user the repository is underneath"),
		packageData: z
			.object({
				dependencies: z.record(z.string(), z.string()).optional(),
				devDependencies: z.record(z.string(), z.string()).optional(),
				scripts: z.record(z.string(), z.string()).optional(),
			})
			.optional()
			.describe("additional properties to include in `package.json`"),
		repository: z
			.string()
			.describe("'Sentence case.' description of the repository"),
		title: z.string().describe("'Title Case' title for the repository"),
		version: z
			.string()
			.optional()
			.describe("package version to publish as and store in `package.json`"),
	},
	produce({ options, take }) {
		const allContributors = lazyValue(async () => {
			const contributions = (await take(inputFromFileJSON, {
				filePath: ".all-contributorsrc",
			})) as AllContributorsData;

			return contributions.contributors;
		});

		const documentation = lazyValue(async () => readDocumentation(take));

		const nvmrc = lazyValue(
			async () =>
				await take(inputFromFile, {
					filePath: ".nvmrc",
				}),
		);

		const githubCliUser = lazyValue(async () => {
			return swallowError(
				await take(inputFromScript, {
					command: "gh config get user -h github.com",
				}),
			)?.stdout?.toString();
		});

		// TODO: Make these all use take

		const gitDefaults = tryCatchLazyValueAsync(async () =>
			gitUrlParse(await gitRemoteOriginUrl()),
		);

		const npmDefaults = tryCatchLazyValueAsync(async () => {
			const whoami = (await execaCommand(`npm whoami`)).stdout;
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

		const node = lazyValue(async () => {
			const { engines } = await packageData();

			return {
				minimum:
					(engines?.node && /[\d+.]+/.exec(engines.node))?.[0] ?? "18.3.0",
				pinned: swallowError(await nvmrc()) ?? "20.18.0",
			};
		});

		const version = lazyValue(async () => (await packageData()).version);

		return {
			author,
			bin: async () => (await packageData()).bin,
			contributors: allContributors,
			description: async () => await readDescription(packageData),
			documentation,
			email: async () => readEmails(npmDefaults, packageAuthor),
			funding: readFunding,
			guide: readGuide,
			login: author,
			node,
			owner: async () =>
				(await gitDefaults())?.organization ??
				(await packageAuthor()).author ??
				(await githubCliUser()),
			packageData: async () => {
				const original = await packageData();

				return {
					dependencies: original.dependencies,
					devDependencies: original.devDependencies,
					scripts: original.scripts,
				};
			},
			repository: async () =>
				options.repository ??
				(await gitDefaults())?.name ??
				(await packageData()).name,
			...readDefaultsFromReadme(),
			version,
		};
	},
	template: {
		owner: "JoshuaKGoldberg",
		repository: "create-typescript-app",
	},
});

export type BaseOptions = BaseOptionsFor<typeof base>;
