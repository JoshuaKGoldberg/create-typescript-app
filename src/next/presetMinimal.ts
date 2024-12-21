import { base } from "./base.js";
import { blockContributingDocs } from "./blocks/blockContributingDocs.js";
import { blockContributorCovenant } from "./blocks/blockContributorCovenant.js";
import { blockDevelopmentDocs } from "./blocks/blockDevelopmentDocs.js";
import { blockESLint } from "./blocks/blockESLint.js";
import { blockExampleFiles } from "./blocks/blockExampleFiles.js";
import { blockFunding } from "./blocks/blockFunding.js";
import { blockGitHubActionsCI } from "./blocks/blockGitHubActionsCI.js";
import { blockGitHubIssueTemplates } from "./blocks/blockGitHubIssueTemplates.js";
import { blockGitHubPRTemplate } from "./blocks/blockGitHubPRTemplate.js";
import { blockGitignore } from "./blocks/blockGitignore.js";
import { blockMITLicense } from "./blocks/blockMITLicense.js";
import { blockPackageJson } from "./blocks/blockPackageJson.js";
import { blockPrettier } from "./blocks/blockPrettier.js";
import { blockREADME } from "./blocks/blockREADME.js";
import { blockRepositoryBranchRuleset } from "./blocks/blockRepositoryBranchRuleset.js";
import { blockRepositoryLabels } from "./blocks/blockRepositoryLabels.js";
import { blockRepositorySettings } from "./blocks/blockRepositorySettings.js";
import { blockTemplatedBy } from "./blocks/blockTemplatedBy.js";
import { blockTSup } from "./blocks/blockTSup.js";
import { blockTypeScript } from "./blocks/blockTypeScript.js";

export const presetMinimal = base.createPreset({
	about: {
		description:
			"Just bare starter tooling: building, formatting, linting, and type checking.",
		name: "Minimal",
	},
	blocks: [
		blockContributingDocs,
		blockContributorCovenant,
		blockDevelopmentDocs,
		blockESLint,
		blockExampleFiles,
		blockFunding,
		blockGitHubActionsCI,
		blockGitHubIssueTemplates,
		blockGitHubPRTemplate,
		blockGitignore,
		blockMITLicense,
		blockPackageJson,
		blockPrettier,
		blockREADME,
		blockRepositoryBranchRuleset,
		blockRepositoryLabels,
		blockRepositorySettings,
		blockTemplatedBy,
		blockTSup,
		blockTypeScript,
	],
});
