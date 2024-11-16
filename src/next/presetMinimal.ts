import { base } from "./base.js";
import { blockContributorCovenant } from "./blocks/blockContributorCovenant.js";
import { blockDevelopmentDocs } from "./blocks/blockDevelopmentDocs.js";
import { blockESLint } from "./blocks/blockESLint.js";
import { blockFunding } from "./blocks/blockFunding.js";
import { blockGitHubActionsCI } from "./blocks/blockGitHubActionsCI.js";
import { blockGitignore } from "./blocks/blockGitignore.js";
import { blockPackageJson } from "./blocks/blockPackageJson.js";
import { blockPrettier } from "./blocks/blockPrettier.js";
import { blockTSup } from "./blocks/blockTSup.js";
import { blockTypeScript } from "./blocks/blockTypeScript.js";

export const presetMinimal = base.createPreset({
	about: {
		description:
			"Just bare starter tooling: building, formatting, linting, and type checking.",
		name: "Minimal",
	},
	blocks: [
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
		blockTSup(),
		blockTypeScript(),
	],
});
