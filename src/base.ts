import { BaseOptionsFor, createBase } from "bingo-stratum";
import { inputFromFile } from "input-from-file";
import { inputFromScript } from "input-from-script";
import lazyValue from "lazy-value";
import { z } from "zod";

import { readAccess } from "./options/readAccess.js";
import { readAllContributors } from "./options/readAllContributors.js";
import { readAuthor } from "./options/readAuthor.js";
import { readDescription } from "./options/readDescription.js";
import { readDocumentation } from "./options/readDocumentation.js";
import { readEmailFromCodeOfConduct } from "./options/readEmailFromCodeOfConduct.js";
import { readEmailFromGit } from "./options/readEmailFromGit.js";
import { readEmailFromNpm } from "./options/readEmailFromNpm.js";
import { readEmails } from "./options/readEmails.js";
import { readEmoji } from "./options/readEmoji.js";
import { readExistingLabels } from "./options/readExistingLabels.js";
import { readExplainer } from "./options/readExplainer.js";
import { readFileSafe } from "./options/readFileSafe.js";
import { readFunding } from "./options/readFunding.js";
import { readGitDefaults } from "./options/readGitDefaults.js";
import { readGuide } from "./options/readGuide.js";
import { readLogo } from "./options/readLogo.js";
import { readNode } from "./options/readNode.js";
import { readNpmDefaults } from "./options/readNpmDefaults.js";
import { readOwner } from "./options/readOwner.js";
import { readPackageAuthor } from "./options/readPackageAuthor.js";
import { readPackageData } from "./options/readPackageData.js";
import { readPnpm } from "./options/readPnpm.js";
import { readRepository } from "./options/readRepository.js";
import { readRulesetId } from "./options/readRulesetId.js";
import { readTitle } from "./options/readTitle.js";
import { readUsage } from "./options/readUsage.js";
import { readWorkflowsVersions } from "./options/readWorkflowsVersions.js";
import { zContributor, zWorkflowsVersions } from "./schemas.js";

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
			.default("A very lovely package. Hooray!")
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
			// TODO: Test this? Is it still working?
			// https://github.com/JoshuaKGoldberg/create-typescript-app/issues/1991
			.transform((email) =>
				typeof email === "string" ? { github: email, npm: email } : email,
			)
			.describe(
				"email address to be listed as the point of contact in docs and packages",
			),
		emoji: z
			.string()
			.optional()
			.describe("decorative emoji to use in descriptions and docs"),
		existingLabels: z
			.array(
				z.object({
					color: z.string(),
					description: z.string(),
					name: z.string(),
				}),
			)
			.optional()
			.describe("existing labels from the GitHub repository"),
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
				"local image file and alt text to display near the top of the README.md",
			),
		node: z
			.object({
				minimum: z.string(),
				pinned: z.string().optional(),
			})
			.optional()
			.describe("Node.js engine version(s) to pin and require a minimum of"),
		owner: z.string().describe("organization or user owning the repository"),
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
			.describe("Markdown docs to put in README.md under the ## Usage heading"),
		version: z
			.string()
			.optional()
			.describe("package version to publish as and store in `package.json`"),
		workflowsVersions: zWorkflowsVersions
			.optional()
			.describe("existing versions of GitHub Actions workflows used"),
	},
	prepare({ options, take }) {
		const getAccess = lazyValue(async () => await readAccess(getPackageData));

		const getAllContributors = lazyValue(
			async () => await readAllContributors(take),
		);

		const getAuthor = lazyValue(
			async () =>
				await readAuthor(getPackageAuthor, getNpmDefaults, options.owner),
		);

		const getBin = lazyValue(async () => (await getPackageData()).bin);

		const getEmoji = lazyValue(async () => await readEmoji(getDescription));

		const getDescription = lazyValue(
			async () => await readDescription(getPackageData, getReadme),
		);

		const getDocumentation = lazyValue(
			async () => await readDocumentation(take),
		);

		const getEmail = lazyValue(
			async () =>
				await readEmails(
					getEmailFromCodeOfConduct,
					getEmailFromGit,
					getEmailFromNpm,
				),
		);

		const getEmailFromCodeOfConduct = lazyValue(
			async () => await readEmailFromCodeOfConduct(take),
		);

		const getEmailFromGit = lazyValue(async () => await readEmailFromGit(take));

		const getEmailFromNpm = lazyValue(
			async () => await readEmailFromNpm(getNpmDefaults, getPackageAuthor),
		);

		const getExistingLabels = lazyValue(
			async () => await readExistingLabels(take, getOwner, getRepository),
		);

		const getExplainer = lazyValue(async () => await readExplainer(getReadme));

		const getFunding = lazyValue(async () => await readFunding(take));

		const getGitDefaults = lazyValue(async () => await readGitDefaults(take));

		const getGuide = lazyValue(async () => await readGuide(take));

		const getLogo = lazyValue(async () => await readLogo(getReadme));

		const getPackageData = lazyValue(async () => await readPackageData(take));

		const getNode = lazyValue(
			async () => await readNode(getNvmrc, getPackageData),
		);

		const getNpmDefaults = lazyValue(
			async () => await readNpmDefaults(getNpmWhoami),
		);

		const getNpmWhoami = lazyValue(
			async () =>
				await take(inputFromScript, { command: "npm whoami --offline" }),
		);

		const getNvmrc = lazyValue(
			async () =>
				await take(inputFromFile, {
					filePath: ".nvmrc",
				}),
		);

		const getOwner = lazyValue(
			async () => await readOwner(take, getGitDefaults, getPackageAuthor),
		);

		const getPackageAuthor = lazyValue(
			async () => await readPackageAuthor(getPackageData),
		);

		const getPnpm = lazyValue(async () => await readPnpm(getPackageData));

		const getReadme = lazyValue(
			async () => await readFileSafe("README.md", ""),
		);

		const getRepository = lazyValue(
			async () => await readRepository(getGitDefaults, getPackageData, options),
		);

		const getRulesetId = lazyValue(
			async () => await readRulesetId(take, getOwner, getRepository),
		);

		const getTitle = lazyValue(
			async () => await readTitle(getReadme, getRepository),
		);

		const getUsage = lazyValue(
			async () => await readUsage(getEmoji, getReadme, getRepository),
		);

		const getVersion = lazyValue(async () => (await getPackageData()).version);

		const getWorkflowData = lazyValue(
			async () => await readWorkflowsVersions(take),
		);

		return {
			access: getAccess,
			author: getAuthor,
			bin: getBin,
			contributors: getAllContributors,
			description: getDescription,
			documentation: getDocumentation,
			email: getEmail,
			emoji: getEmoji,
			existingLabels: getExistingLabels,
			explainer: getExplainer,
			funding: getFunding,
			guide: getGuide,
			logo: getLogo,
			node: getNode,
			owner: getOwner,
			packageData: getPackageData,
			pnpm: getPnpm,
			repository: getRepository,
			rulesetId: getRulesetId,
			title: getTitle,
			usage: getUsage,
			version: getVersion,
			workflowsVersions: getWorkflowData,
		};
	},
});

export type BaseOptions = BaseOptionsFor<typeof base>;
