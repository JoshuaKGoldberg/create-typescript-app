import { base } from "../base.mjs";
import { blockRemoveFiles } from "../blocks/blockRemoveFiles.mjs";
import { blockRepositoryBranchRuleset } from "../blocks/blockRepositoryBranchRuleset.mjs";
import { blockGitHubActionsCI } from "../blocks/blockGitHubActionsCI.mjs";
import { blockPackageJson } from "../blocks/blockPackageJson.mjs";
import { blockDevelopmentDocs } from "../blocks/blockDevelopmentDocs.mjs";
import { blockRemoveWorkflows } from "../blocks/blockRemoveWorkflows.mjs";
import { blockRemoveDependencies } from "../blocks/blockRemoveDependencies.mjs";
import { blockESLint } from "../blocks/blockESLint.mjs";
import { blockREADME } from "../blocks/blockREADME.mjs";
import { blockExampleFiles } from "../blocks/blockExampleFiles.mjs";
import { blockGitignore } from "../blocks/blockGitignore.mjs";
import { blockPrettier } from "../blocks/blockPrettier.mjs";
import { blockRepositorySecrets } from "../blocks/blockRepositorySecrets.mjs";
import { blockTSDown } from "../blocks/blockTSDown.mjs";
import { blockGitHubApps } from "../blocks/blockGitHubApps.mjs";
import { blockContributingDocs } from "../blocks/blockContributingDocs.mjs";
import { blockContributorCovenant } from "../blocks/blockContributorCovenant.mjs";
import { blockExports } from "../blocks/blockExports.mjs";
import { blockGitHubIssueTemplates } from "../blocks/blockGitHubIssueTemplates.mjs";
import { blockGitHubPRTemplate } from "../blocks/blockGitHubPRTemplate.mjs";
import { blockMITLicense } from "../blocks/blockMITLicense.mjs";
import { blockRepositoryLabels } from "../blocks/blockRepositoryLabels.mjs";
import { blockRepositorySettings } from "../blocks/blockRepositorySettings.mjs";
import { blockSecurityDocs } from "../blocks/blockSecurityDocs.mjs";
import { blockSideEffects } from "../blocks/blockSideEffects.mjs";
import { blockTemplatedWith } from "../blocks/blockTemplatedWith.mjs";
import { blockTypeScript } from "../blocks/blockTypeScript.mjs";
//#region src/presets/minimal.ts
const presetMinimal = base.createPreset({
	about: {
		description: "Just bare starter tooling: building, formatting, linting, and type checking.",
		name: "Minimal"
	},
	blocks: [
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
		blockTypeScript
	]
});
//#endregion
export { presetMinimal };
