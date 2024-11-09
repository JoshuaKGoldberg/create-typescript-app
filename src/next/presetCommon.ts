import { blockContributorCovenant } from "./blocks/blockContributorCovenant.js";
import { blockDevelopmentDocs } from "./blocks/blockDevelopmentDocs.js";
import { blockESLint } from "./blocks/blockESLint.js";
import { blockFunding } from "./blocks/blockFunding.js";
import { blockGitHubActions } from "./blocks/blockGitHubActions.js";
import { blockGitignore } from "./blocks/blockGitignore.js";
import { blockPrettier } from "./blocks/blockPrettier.js";
import { blockTSup } from "./blocks/blockTSup.js";
import { blockTypeScript } from "./blocks/blockTypeScript.js";
import { schema } from "./schema.js";

export const presetCommon = schema.createPreset({
	about: {
		description:
			"Bare starters plus testing and automation for all-contributors and releases.",
		name: "Common",
	},
	blocks: [
		blockContributorCovenant(),
		blockDevelopmentDocs(),
		blockESLint({
			// todo: get rid of need
		}),
		blockFunding(),
		blockGitHubActions(),
		blockGitignore(),
		blockPrettier(),
		blockTSup(),
		blockTypeScript(),
	],
});
