import { blockAllContributors } from "./blocks/blockAllContributors.js";
import { blockContributorCovenant } from "./blocks/blockContributorCovenant.js";
import { blockDevelopmentDocs } from "./blocks/blockDevelopmentDocs.js";
import { blockESLint } from "./blocks/blockESLint.js";
import { blockFunding } from "./blocks/blockFunding.js";
import { blockGitHubActionsCI } from "./blocks/blockGitHubActionsCI.js";
import { blockGitignore } from "./blocks/blockGitignore.js";
import { blockPackageJson } from "./blocks/blockPackageJson.js";
import { blockPrettier } from "./blocks/blockPrettier.js";
import { blockReleaseIt } from "./blocks/blockReleaseIt.js";
import { blockTSup } from "./blocks/blockTSup.js";
import { blockTypeScript } from "./blocks/blockTypeScript.js";
import { blockVitest } from "./blocks/blockVitest.js";
import { schema } from "./schema.js";

export const presetCommon = schema.createPreset({
	about: {
		description:
			"Bare starters plus testing and automation for all-contributors and releases.",
		name: "Common",
	},
	blocks: [
		blockAllContributors(),
		blockContributorCovenant(),
		blockDevelopmentDocs(),
		blockESLint({
			// todo: get rid of need
		}),
		blockFunding(),
		blockGitHubActionsCI(),
		blockGitignore(),
		blockPackageJson(),
		blockPrettier(),
		blockReleaseIt(),
		blockTSup(),
		blockTypeScript(),
		blockVitest(),
	],
});
