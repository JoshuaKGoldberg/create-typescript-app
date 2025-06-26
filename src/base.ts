import { BaseOptionsFor, createBase } from "bingo-stratum";
import { inputFromFile } from "input-from-file";
import { inputFromScript } from "input-from-script";
import lazyValue from "lazy-value";
import { z } from "zod";

import { readAccess } from "./options/readAccess.js";
import { readAllContributors } from "./options/readAllContributors.js";
import { readAuthor } from "./options/readAuthor.js";
import { readBin } from "./options/readBin.js";
import { readDescription } from "./options/readDescription.js";
import { readDevelopmentDocumentation } from "./options/readDevelopmentDocumentation.js";
import { readDocumentation } from "./options/readDocumentation.js";
import { readEmailFromCodeOfConduct } from "./options/readEmailFromCodeOfConduct.js";
import { readEmailFromGit } from "./options/readEmailFromGit.js";
import { readEmailFromNpm } from "./options/readEmailFromNpm.js";
import { readEmails } from "./options/readEmails.js";
import { readEmoji } from "./options/readEmoji.js";
import { readExistingLabels } from "./options/readExistingLabels.js";
import { readFileSafe } from "./options/readFileSafe.js";
import { readFunding } from "./options/readFunding.js";
import { readGitDefaults } from "./options/readGitDefaults.js";
import { readGuide } from "./options/readGuide.js";
import { readKeywords } from "./options/readKeywords.js";
import { readLogo } from "./options/readLogo.js";
import { readNode } from "./options/readNode.js";
import { readNpmDefaults } from "./options/readNpmDefaults.js";
import { readOwner } from "./options/readOwner.js";
import { readPackageAuthor } from "./options/readPackageAuthor.js";
import { readPackageData } from "./options/readPackageData.js";
import { readPnpm } from "./options/readPnpm.js";
import { readReadmeAdditional } from "./options/readReadmeAdditional.js";
import { readReadmeExplainer } from "./options/readReadmeExplainer.js";
import { readReadmeFootnotes } from "./options/readReadmeFootnotes.js";
import { readReadmeUsage } from "./options/readReadmeUsage.js";
import { readRepository } from "./options/readRepository.js";
import { readRulesetId } from "./options/readRulesetId.js";
import { readTitle } from "./options/readTitle.js";
import { readWords } from "./options/readWords.js";
import { readWorkflowsVersions } from "./options/readWorkflowsVersions.js";
import { zContributor, zDocumentation, zWorkflowsVersions } from "./schemas.js";

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
			.union([z.string(), z.record(z.string())])
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
		documentation: zDocumentation.describe(
			"additional docs to add to .md files",
		),
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
			.describe("Node.js engine version(s) to pin and require a minimum of"),
		owner: z.string().describe("organization or user owning the repository"),
		packageData: z
			.object({
				dependencies: z.record(z.string(), z.string()).optional(),
				devDependencies: z.record(z.string(), z.string()).optional(),
				peerDependencies: z.record(z.string(), z.string()).optional(),
				peerDependenciesMeta: z.record(z.unknown()).optional(),
				scripts: z.record(z.string(), z.string().optional()).optional(),
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
		type: z
			.union([z.literal("commonjs"), z.literal("module")])
			.optional()
			.describe("package.json modules type"),
		version: z
			.string()
			.optional()
			.describe("package version to publish as and store in `package.json`"),
		words: z
			.array(z.string())
			.optional()
			.describe("additional words to add to the CSpell dictionary"),
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

		const getBin = lazyValue(async () => await readBin(getPackageData));

		const getEmoji = lazyValue(async () => await readEmoji(getDescription));

		const getDescription = lazyValue(
			async () =>
				await readDescription(getPackageData, getReadme, getRepository),
		);

		const getDevelopmentDocumentation = lazyValue(
			async () => await readDevelopmentDocumentation(take),
		);

		const getDocumentation = lazyValue(
			async () =>
				await readDocumentation(
					getDevelopmentDocumentation,
					getReadmeAdditional,
					getReadmeExplainer,
					getReadmeFootnotes,
					getReadmeUsage,
				),
		);

		const getEmail = lazyValue(
			async () =>
				await readEmails(
					getEmailFromCodeOfConduct,
					getEmailFromGit,
					getEmailFromNpm,
					getPackageAuthor,
				),
		);

		const getKeywords = lazyValue(
			async () => await readKeywords(getPackageData),
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

		const getReadmeAdditional = lazyValue(
			async () => await readReadmeAdditional(getReadme),
		);

		const getReadmeExplainer = lazyValue(
			async () => await readReadmeExplainer(getReadme),
		);

		const getReadmeFootnotes = lazyValue(
			async () => await readReadmeFootnotes(getReadme),
		);

		const getReadmeUsage = lazyValue(
			async () => await readReadmeUsage(getReadme),
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

		const getType = lazyValue(async () => (await getPackageData()).type);

		const getVersion = lazyValue(async () => (await getPackageData()).version);

		const getWords = lazyValue(async () => await readWords(take));

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
			funding: getFunding,
			guide: getGuide,
			keywords: getKeywords,
			logo: getLogo,
			node: getNode,
			owner: getOwner,
			packageData: getPackageData,
			pnpm: getPnpm,
			repository: getRepository,
			rulesetId: getRulesetId,
			title: getTitle,
			type: getType,
			version: getVersion,
			words: getWords,
			workflowsVersions: getWorkflowData,
		};
	},
});

export type BaseOptions = BaseOptionsFor<typeof base> & { preset?: string };
