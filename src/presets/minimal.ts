import { base } from "../base.ts";
import { blockBin } from "../blocks/blockBin.ts";
import { blockContributingDocs } from "../blocks/blockContributingDocs.ts";
import { blockContributorCovenant } from "../blocks/blockContributorCovenant.ts";
import { blockDevelopmentDocs } from "../blocks/blockDevelopmentDocs.ts";
import { blockESLint } from "../blocks/blockESLint.ts";
import { blockExampleFiles } from "../blocks/blockExampleFiles.ts";
import { blockExports } from "../blocks/blockExports.ts";
import { blockGitHubActionsCI } from "../blocks/blockGitHubActionsCI.ts";
import { blockGitHubApps } from "../blocks/blockGitHubApps.ts";
import { blockGitHubIssueTemplates } from "../blocks/blockGitHubIssueTemplates.ts";
import { blockGitHubPRTemplate } from "../blocks/blockGitHubPRTemplate.ts";
import { blockGitignore } from "../blocks/blockGitignore.ts";
import { blockMITLicense } from "../blocks/blockMITLicense.ts";
import { blockPackageJson } from "../blocks/blockPackageJson.ts";
import { blockPrettier } from "../blocks/blockPrettier.ts";
import { blockREADME } from "../blocks/blockREADME.ts";
import { blockRemoveDependencies } from "../blocks/blockRemoveDependencies.ts";
import { blockRemoveFiles } from "../blocks/blockRemoveFiles.ts";
import { blockRemoveWorkflows } from "../blocks/blockRemoveWorkflows.ts";
import { blockRepositoryBranchRuleset } from "../blocks/blockRepositoryBranchRuleset.ts";
import { blockRepositoryLabels } from "../blocks/blockRepositoryLabels.ts";
import { blockRepositorySecrets } from "../blocks/blockRepositorySecrets.ts";
import { blockRepositorySettings } from "../blocks/blockRepositorySettings.ts";
import { blockSecurityDocs } from "../blocks/blockSecurityDocs.ts";
import { blockSideEffects } from "../blocks/blockSideEffects.ts";
import { blockTemplatedWith } from "../blocks/blockTemplatedWith.ts";
import { blockTSDown } from "../blocks/blockTSDown.ts";
import { blockTypeScript } from "../blocks/blockTypeScript.ts";

export const presetMinimal = base.createPreset({
	about: {
		description:
			"Just bare starter tooling: building, formatting, linting, and type checking.",
		name: "Minimal",
	},
	blocks: [
		blockBin,
		blockContributingDocs,
		blockContributorCovenant,
		blockDevelopmentDocs,
		blockESLint,
		blockExports,
		blockExampleFiles,
		blockGitHubActionsCI,
		blockGitHubApps,
		blockGitHubIssueTemplates,
		blockGitHubPRTemplate,
		blockGitignore,
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
		blockSideEffects,
		blockTemplatedWith,
		blockTSDown,
		blockTypeScript,
	],
});
