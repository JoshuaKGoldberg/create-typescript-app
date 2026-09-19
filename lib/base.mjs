import { readAccess } from "./options/readAccess.mjs";
import { readAllContributors } from "./options/readAllContributors.mjs";
import { readAuthor } from "./options/readAuthor.mjs";
import { readBin } from "./options/readBin.mjs";
import { readDescription } from "./options/readDescription.mjs";
import { readDevelopmentDocumentation } from "./options/readDevelopmentDocumentation.mjs";
import { readDocumentation } from "./options/readDocumentation.mjs";
import { readEmailFromCodeOfConduct } from "./options/readEmailFromCodeOfConduct.mjs";
import { readEmailFromGit } from "./options/readEmailFromGit.mjs";
import { readEmailFromNpm } from "./options/readEmailFromNpm.mjs";
import { readEmails } from "./options/readEmails.mjs";
import { readEmoji } from "./options/readEmoji.mjs";
import { readExistingLabels } from "./options/readExistingLabels.mjs";
import { readFileSafe } from "./options/readFileSafe.mjs";
import { readFunding } from "./options/readFunding.mjs";
import { readGitDefaults } from "./options/readGitDefaults.mjs";
import { readGuide } from "./options/readGuide.mjs";
import { readKeywords } from "./options/readKeywords.mjs";
import { readLogo } from "./options/readLogo.mjs";
import { readNode } from "./options/readNode.mjs";
import { readNpmDefaults } from "./options/readNpmDefaults.mjs";
import { readOwner } from "./options/readOwner.mjs";
import { readPackageAuthor } from "./options/readPackageAuthor.mjs";
import { readPackageData } from "./options/readPackageData.mjs";
import { readPnpm } from "./options/readPnpm.mjs";
import { readReadmeFootnotes } from "./options/readReadmeFootnotes.mjs";
import { readReadmeAdditional } from "./options/readReadmeAdditional.mjs";
import { readReadmeExplainer } from "./options/readReadmeExplainer.mjs";
import { readReadmeUsage } from "./options/readReadmeUsage.mjs";
import { readRepository } from "./options/readRepository.mjs";
import { readRulesetId } from "./options/readRulesetId.mjs";
import { readTitle } from "./options/readTitle.mjs";
import { readWords } from "./options/readWords.mjs";
import { readWorkflowsVersions } from "./options/readWorkflowsVersions.mjs";
import { zContributor, zDocumentation, zWorkflowsVersions } from "./schemas.mjs";
import { createBase } from "bingo-stratum";
import { inputFromFile } from "input-from-file";
import { inputFromScript } from "input-from-script";
import lazyValue from "lazy-value";
import { z } from "zod";
//#region src/base.ts
const base = createBase({
	options: {
		access: z.union([z.literal("public"), z.literal("restricted")]).describe("which `npm publish --access` to release npm packages with"),
		author: z.string().optional().describe("username on npm to publish packages under"),
		bin: z.union([z.string(), z.record(z.string())]).optional().describe("value to set in `package.json`'s `\"bin\"` property"),
		contributors: z.array(zContributor).optional().describe("AllContributors contributors to store in .all-contributorsrc"),
		description: z.string().default("A very lovely package. Hooray!").describe("'Sentence case.' description of the repository"),
		directory: z.string().describe("Directory to create the repository in"),
		documentation: zDocumentation.describe("additional docs to add to .md files"),
		email: z.union([z.string(), z.object({
			github: z.string(),
			npm: z.string()
		})]).transform((email) => typeof email === "string" ? {
			github: email,
			npm: email
		} : email).describe("email address to be listed as the point of contact in docs and packages"),
		emoji: z.string().optional().describe("decorative emoji to use in descriptions and docs"),
		existingLabels: z.array(z.object({
			color: z.string(),
			description: z.string(),
			name: z.string()
		})).optional().describe("existing labels from the GitHub repository"),
		funding: z.string().optional().describe("GitHub organization or username to mention in `funding.yaml`"),
		guide: z.object({
			href: z.string(),
			title: z.string()
		}).optional().describe("link to a contribution guide to place at the top of development docs"),
		keywords: z.array(z.string()).optional().describe("any number of keywords to include in `package.json`"),
		logo: z.object({
			alt: z.string(),
			height: z.number().optional(),
			src: z.string(),
			width: z.number().optional()
		}).optional().describe("local image file and alt text to display near the top of the README.md"),
		node: z.object({
			minimum: z.string(),
			pinned: z.string().optional()
		}).describe("Node.js engine version(s) to pin and require a minimum of"),
		owner: z.string().describe("organization or user owning the repository"),
		packageData: z.object({
			dependencies: z.record(z.string(), z.string()).optional(),
			devDependencies: z.record(z.string(), z.string()).optional(),
			peerDependencies: z.record(z.string(), z.string()).optional(),
			peerDependenciesMeta: z.record(z.unknown()).optional(),
			scripts: z.record(z.string(), z.string().optional()).optional()
		}).optional().describe("additional properties to include in `package.json`"),
		pnpm: z.string().optional().describe("pnpm version for package.json's packageManager field"),
		repository: z.string().describe("'kebab-case' or 'PascalCase' title of the repository"),
		rulesetId: z.string().optional().describe("GitHub branch ruleset ID for main branch protections"),
		title: z.string().describe("'Title Case' title for the repository"),
		type: z.union([z.literal("commonjs"), z.literal("module")]).optional().describe("package.json modules type"),
		version: z.string().optional().describe("package version to publish as and store in `package.json`"),
		words: z.array(z.string()).optional().describe("additional words to add to the CSpell dictionary"),
		workflowsVersions: zWorkflowsVersions.optional().describe("existing versions of GitHub Actions workflows used")
	},
	prepare({ options, take }) {
		const getAccess = lazyValue(async () => await readAccess(getPackageData));
		const getAllContributors = lazyValue(async () => await readAllContributors(take));
		const getAuthor = lazyValue(async () => await readAuthor(getPackageAuthor, getNpmDefaults, getGitUser, options.owner));
		const getBin = lazyValue(async () => await readBin(getPackageData));
		const getEmoji = lazyValue(async () => await readEmoji(getDescription));
		const getDescription = lazyValue(async () => await readDescription(getPackageData, getReadme, getRepository));
		const getDevelopmentDocumentation = lazyValue(async () => await readDevelopmentDocumentation(take));
		const getDocumentation = lazyValue(async () => await readDocumentation(getDevelopmentDocumentation, getReadmeAdditional, getReadmeExplainer, getReadmeFootnotes, getReadmeUsage));
		const getEmail = lazyValue(async () => await readEmails(getEmailFromCodeOfConduct, getEmailFromGit, getEmailFromNpm, getPackageAuthor));
		const getKeywords = lazyValue(async () => await readKeywords(getPackageData));
		const getEmailFromCodeOfConduct = lazyValue(async () => await readEmailFromCodeOfConduct(take));
		const getEmailFromGit = lazyValue(async () => await readEmailFromGit(take));
		const getEmailFromNpm = lazyValue(async () => await readEmailFromNpm(getNpmDefaults, getPackageAuthor));
		const getExistingLabels = lazyValue(async () => await readExistingLabels(take, getOwner, getRepository));
		const getFunding = lazyValue(async () => await readFunding(take));
		const getGitDefaults = lazyValue(async () => await readGitDefaults(take));
		const getGitUser = lazyValue(async () => await take(inputFromScript, { command: "git config user.name" }));
		const getGuide = lazyValue(async () => await readGuide(take));
		const getLogo = lazyValue(async () => await readLogo(getReadme));
		const getPackageData = lazyValue(async () => await readPackageData(take));
		const getNode = lazyValue(async () => await readNode(getNvmrc, getPackageData));
		const getNpmDefaults = lazyValue(async () => await readNpmDefaults(getNpmWhoami));
		const getNpmWhoami = lazyValue(async () => await take(inputFromScript, { command: "npm whoami --offline" }));
		const getNvmrc = lazyValue(async () => await take(inputFromFile, { filePath: ".nvmrc" }));
		const getOwner = lazyValue(async () => await readOwner(take, getGitDefaults, getPackageAuthor));
		const getPackageAuthor = lazyValue(async () => await readPackageAuthor(getPackageData));
		const getPnpm = lazyValue(async () => await readPnpm(getPackageData));
		const getReadme = lazyValue(async () => await readFileSafe("README.md", ""));
		const getReadmeAdditional = lazyValue(async () => await readReadmeAdditional(getReadme));
		const getReadmeExplainer = lazyValue(async () => await readReadmeExplainer(getReadme));
		const getReadmeFootnotes = lazyValue(async () => await readReadmeFootnotes(getReadme));
		const getReadmeUsage = lazyValue(async () => await readReadmeUsage(getReadme));
		const getRepository = lazyValue(async () => await readRepository(getGitDefaults, getPackageData, options));
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
			rulesetId: lazyValue(async () => await readRulesetId(take, getOwner, getRepository)),
			title: lazyValue(async () => await readTitle(getReadme, getRepository)),
			type: lazyValue(async () => (await getPackageData()).type),
			version: lazyValue(async () => (await getPackageData()).version),
			words: lazyValue(async () => await readWords(take)),
			workflowsVersions: lazyValue(async () => await readWorkflowsVersions(take))
		};
	}
});
//#endregion
export { base };
