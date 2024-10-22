import { blockAllContributors } from "./blocks/blockAllContributors.js";
import { blockContributingDocs } from "./blocks/blockContributingDocs.js";
import { blockContributorCovenant } from "./blocks/blockContributorCovenant.js";
import { blockCSpell } from "./blocks/blockCSpell.js";
import { blockDevelopmentDocs } from "./blocks/blockDevelopmentDocs.js";
import { blockESLint } from "./blocks/blockESLint.js";
import { blockGitHubActions } from "./blocks/blockGitHubActions.js";
import { blockGitHubIssueTemplates } from "./blocks/blockGitHubIssueTemplates.js";
import { blockGitHubPRTemplate } from "./blocks/blockGitHubPRTemplate.js";
import { blockGitignore } from "./blocks/blockGitignore.js";
import { blockKnip } from "./blocks/blockKnip.js";
import { blockMarkdownlint } from "./blocks/blockMarkdownlint.js";
import { blockMITLicense } from "./blocks/blockMITLicense.js";
import { blockNvmrc } from "./blocks/blockNvmrc.js";
import { blockPackageJson } from "./blocks/blockPackageJson.js";
import { blockPnpmDedupe } from "./blocks/blockPnpmDedupe.js";
import { blockPRCompliance } from "./blocks/blockPRCompliance.js";
import { blockPrettier } from "./blocks/blockPrettier.js";
import { blockREADME } from "./blocks/blockREADME.js";
import { blockReleaseIt } from "./blocks/blockReleaseIt.js";
import { blockRenovate } from "./blocks/blockRenovate.js";
import { blockSecurityDocs } from "./blocks/blockSecurityDocs.js";
import { blockTSup } from "./blocks/blockTSup.js";
import { blockTypeScript } from "./blocks/blockTypeScript.js";
import { blockVitest } from "./blocks/blockVitest.js";
import { blockVSCode } from "./blocks/blockVSCode.js";
import { schema } from "./schema.js";

export const presetEverything = schema.createPreset({
	about: {
		description:
			"The most comprehensive tooling imaginable: sorting, spellchecking, and more!",
		name: "Everything",
	},
	blocks: [
		blockAllContributors(),
		blockContributingDocs(),
		blockContributorCovenant(),
		blockCSpell(),
		blockDevelopmentDocs(),
		blockESLint({
			// todo: get rid of need
		}),
		blockGitHubActions(),
		blockGitHubIssueTemplates(),
		blockGitHubPRTemplate(),
		blockGitignore(),
		blockKnip(),
		blockMarkdownlint(),
		blockMITLicense(),
		blockNvmrc(),
		blockPackageJson(),
		blockPnpmDedupe(),
		blockPRCompliance(),
		blockPrettier({
			plugins: [
				"prettier-plugin-curly",
				"prettier-plugin-sh",
				"prettier-plugin-packagejson",
			],
		}),
		blockREADME(),
		blockReleaseIt(),
		blockRenovate(),
		blockSecurityDocs(),
		blockTSup(),
		blockTypeScript(),
		blockVSCode(),
		blockVitest(),
	],
});
