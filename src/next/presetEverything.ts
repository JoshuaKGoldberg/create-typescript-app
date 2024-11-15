import { blockAllContributors } from "./blocks/blockAllContributors.js";
import { blockContributingDocs } from "./blocks/blockContributingDocs.js";
import { blockContributorCovenant } from "./blocks/blockContributorCovenant.js";
import { blockCSpell } from "./blocks/blockCSpell.js";
import { blockDevelopmentDocs } from "./blocks/blockDevelopmentDocs.js";
import { blockESLint } from "./blocks/blockESLint.js";
import { blockESLintComments } from "./blocks/blockESLintComments.js";
import { blockESLintJSDoc } from "./blocks/blockESLintJSDoc.js";
import { blockESLintJSONC } from "./blocks/blockESLintJSONC.js";
import { blockESLintMarkdown } from "./blocks/blockESLintMarkdown.js";
import { blockESLintNode } from "./blocks/blockESLintNode.js";
import { blockESLintPackageJson } from "./blocks/blockESLintPackageJson.js";
import { blockESLintPerfectionist } from "./blocks/blockESLintPerfectionist.js";
import { blockESLintRegexp } from "./blocks/blockESLintRegexp.js";
import { blockESLintYML } from "./blocks/blockESLintYML.js";
import { blockFunding } from "./blocks/blockFunding.js";
import { blockGitHubActionsCI } from "./blocks/blockGitHubActionsCI.js";
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
			rules: [
				{
					comment:
						"These off-by-default rules work well for this repo and we like them on.",
					entries: {
						"logical-assignment-operators": [
							"error",
							"always",
							{ enforceForIfStatements: true },
						],
						"operator-assignment": "error",
					},
				},
				{
					comment: "Stylistic concerns that don't interfere with Prettier",
					entries: {
						"no-useless-rename": "error",
						"object-shorthand": "error",
					},
				},
			],
		}),
		blockESLintComments(),
		blockESLintJSDoc(),
		blockESLintJSONC(),
		blockESLintMarkdown(),
		blockESLintNode(),
		blockESLintPackageJson(),
		blockESLintPerfectionist(),
		blockESLintRegexp(),
		blockESLintYML(),
		blockFunding(),
		blockGitHubActionsCI(),
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
