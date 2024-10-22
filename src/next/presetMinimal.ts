import { blockContributorCovenant } from "./blocks/blockContributorCovenant.js";
import { blockDevelopmentDocs } from "./blocks/blockDevelopmentDocs.js";
import { blockESLint } from "./blocks/blockESLint.js";
import { blockGitHubActions } from "./blocks/blockGitHubActions.js";
import { blockGitignore } from "./blocks/blockGitignore.js";
import { blockPrettier } from "./blocks/blockPrettier.js";
import { blockTSup } from "./blocks/blockTSup.js";
import { blockTypeScript } from "./blocks/blockTypeScript.js";
import { schema } from "./schema.js";

export const presetMinimal = schema.createPreset({
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
		blockGitHubActions(),
		blockGitignore(),
		blockPrettier(),
		blockTSup(),
		blockTypeScript(),
	],
});
