import { BaseOptionsFor, createBase } from "bingo-stratum";
import { execaCommand } from "execa";
import gitRemoteOriginUrl from "git-remote-origin-url";
import gitUrlParse from "git-url-parse";
import { inputFromFile } from "input-from-file";
import { inputFromScript } from "input-from-script";
import lazyValue from "lazy-value";
import npmUser from "npm-user";
import { z } from "zod";

import { inputFromOctokit } from "./inputs/inputFromOctokit.js";
import { parsePackageAuthor } from "./options/parsePackageAuthor.js";
import { readAllContributors } from "./options/readAllContributors.js";
import { readDefaultsFromReadme } from "./options/readDefaultsFromReadme.js";
import { readDescription } from "./options/readDescription.js";
import { readDocumentation } from "./options/readDocumentation.js";
import { readEmails } from "./options/readEmails.js";
import { readFileSafe } from "./options/readFileSafe.js";
import { readFunding } from "./options/readFunding.js";
import { readGuide } from "./options/readGuide.js";
import { readPackageData } from "./options/readPackageData.js";
import { readPnpm } from "./options/readPnpm.js";
import { swallowError } from "./utils/swallowError.js";
import { tryCatchLazyValueAsync } from "./utils/tryCatchLazyValueAsync.js";

const zContributor = z.object({
	avatar_url: z.string(),
	contributions: z.array(z.string()),
	login: z.string(),
	name: z.string(),
	profile: z.string(),
});

export type Contributor = z.infer<typeof zContributor>;

export const base = createBase({
	options: {
		access: z
			.union([z.literal("public"), z.literal("restricted")])
			.describe("which `npm publish --access` to release npm packages with"),
		author: z
			.string()
			.optional()
			.describe("username on npm to publish packages under"),
		bin: z
			.string()
			.optional()
			.describe('value to set in `package.json`\'s `"bin"` property'),
		contributors: z
			.array(zContributor)
			.optional()
			.describe("AllContributors contributors to store in .all-contributorsrc"),
		description: z
			.string()
			.default("A very lovely package. Hooray! 💖")
			.describe("'Sentence case.' description of the repository"),
		directory: z.string().describe("Directory to create the repository in"),
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
		explainer: z
			.array(z.string())
			.optional()
			.describe("additional README.md sentence(s) describing the package"),
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
		keywords: z
			.array(z.string())
			.optional()
			.describe("any number of keywords to include in `package.json`"),
		logo: z
			.object({
				alt: z.string(),
				height: z.number().optional(),
				src: z.string(),
				width: z.number().optional(),
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
		pnpm: z
			.string()
			.optional()
			.describe("pnpm version for package.json's packageManager field"),
		repository: z
			.string()
			.describe("'kebab-case' or 'PascalCase' title of the repository"),
		rulesetId: z
			.string()
			.optional()
			.describe("GitHub branch ruleset ID for main branch protections"),
		title: z.string().describe("'Title Case' title for the repository"),
		usage: z
			.string()
			.optional()
			.describe("markdown docs to put in README.md under the ## Usage heading"),
		version: z
			.string()
			.optional()
			.describe("package version to publish as and store in `package.json`"),
	},
	prepare({ options, take }) {
		const allContributors = lazyValue(async () => readAllContributors(take));
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

		const readme = lazyValue(async () => await readFileSafe("README.md", ""));

		const rulesetId = lazyValue(async () => {
			const rulesets = (await take(inputFromOctokit, {
				endpoint: "GET /repos/{owner}/{repo}/rulesets",
				options: {
					owner: await owner(),
					repo: await repository(),
				},
			})) as undefined | { id: string; name: string }[];

			return rulesets?.find(
				(ruleset) => ruleset.name === "Branch protection for main",
			)?.id;
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

		const author = lazyValue(
			async () =>
				(await packageAuthor()).author ??
				(await npmDefaults())?.name ??
				options.owner,
		);

		const node = lazyValue(async () => {
			const { engines } = await packageData();

			return {
				minimum:
					(engines?.node && /[\d+.]+/.exec(engines.node))?.[0] ?? "18.3.0",
				pinned: swallowError(await nvmrc())?.trim() ?? "20.18.0",
			};
		});

		const pnpm = lazyValue(async () => readPnpm(packageData));

		const version = lazyValue(async () => (await packageData()).version);

		const owner = lazyValue(
			async () =>
				(await gitDefaults())?.organization ??
				(await packageAuthor()).author ??
				(await githubCliUser()),
		);

		const repository = lazyValue(
			async () =>
				options.repository ??
				(await gitDefaults())?.name ??
				(await packageData()).name ??
				options.directory,
		);

		const email = lazyValue(async () => readEmails(npmDefaults, packageAuthor));

		return {
			access: "public" as const,
			author,
			bin: async () => (await packageData()).bin,
			contributors: allContributors,
			description: async () => await readDescription(packageData, readme),
			documentation,
			email,
			funding: readFunding,
			guide: readGuide,
			login: author,
			node,
			owner,
			packageData: async () => {
				const original = await packageData();

				return {
					dependencies: original.dependencies,
					devDependencies: original.devDependencies,
					scripts: original.scripts,
				};
			},
			pnpm,
			repository,
			rulesetId,
			...readDefaultsFromReadme(readme, repository),
			version,
		};
	},
});

export type BaseOptions = BaseOptionsFor<typeof base>;
