import { base } from "../base.js";
import { blockContributingDocs } from "../blocks/blockContributingDocs.js";
import { blockContributorCovenant } from "../blocks/blockContributorCovenant.js";
import { blockDevelopmentDocs } from "../blocks/blockDevelopmentDocs.js";
import { blockESLint } from "../blocks/blockESLint.js";
import { blockExampleFiles } from "../blocks/blockExampleFiles.js";
import { blockGitHubActionsCI } from "../blocks/blockGitHubActionsCI.js";
import { blockGitHubApps } from "../blocks/blockGitHubApps.js";
import { blockGitHubIssueTemplates } from "../blocks/blockGitHubIssueTemplates.js";
import { blockGitHubPRTemplate } from "../blocks/blockGitHubPRTemplate.js";
import { blockGitignore } from "../blocks/blockGitignore.js";
import { blockMain } from "../blocks/blockMain.js";
import { blockMITLicense } from "../blocks/blockMITLicense.js";
import { blockPackageJson } from "../blocks/blockPackageJson.js";
import { blockPrettier } from "../blocks/blockPrettier.js";
import { blockREADME } from "../blocks/blockREADME.js";
import { blockRemoveDependencies } from "../blocks/blockRemoveDependencies.js";
import { blockRemoveFiles } from "../blocks/blockRemoveFiles.js";
import { blockRemoveWorkflows } from "../blocks/blockRemoveWorkflows.js";
import { blockRepositoryBranchRuleset } from "../blocks/blockRepositoryBranchRuleset.js";
import { blockRepositoryLabels } from "../blocks/blockRepositoryLabels.js";
import { blockRepositorySecrets } from "../blocks/blockRepositorySecrets.js";
import { blockRepositorySettings } from "../blocks/blockRepositorySettings.js";
import { blockSecurityDocs } from "../blocks/blockSecurityDocs.js";
import { blockTemplatedWith } from "../blocks/blockTemplatedWith.js";
import { blockTSDown } from "../blocks/blockTSDown.js";
import { blockTypeScript } from "../blocks/blockTypeScript.js";

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
		blockGitHubActionsCI,
		blockGitHubApps,
		blockGitHubIssueTemplates,
		blockGitHubPRTemplate,
		blockGitignore,
		blockMain,
		blockMITLicense,
		blockPackageJson,
		blockPrettier,
		blockREADME,
		blockRemoveDependencies,
		blockRemoveFiles,
		blockRemoveWorkflows,
		blockRepositoryBranchRuleset,
		blockRepositoryLabels,
		blockRepositorySecrets,
		blockRepositorySettings,
		blockSecurityDocs,
		blockTemplatedWith,
		blockTSDown,
		blockTypeScript,
	],
});
