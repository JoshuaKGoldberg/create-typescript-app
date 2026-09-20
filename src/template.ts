import { base } from "./base.ts";
import { blockAreTheTypesWrong } from "./blocks/blockAreTheTypesWrong.ts";
import { blockCTATransitions } from "./blocks/blockCTATransitions.ts";
import { blockESLintPlugin } from "./blocks/blockESLintPlugin.ts";
import { blockNcc } from "./blocks/blockNcc.ts";
import { blockRemoveDependencies } from "./blocks/blockRemoveDependencies.ts";
import { blockRemoveFiles } from "./blocks/blockRemoveFiles.ts";
import { blockWebExt } from "./blocks/blockWebExt.ts";
import { presetCommon } from "./presets/common.ts";
import { presetEverything } from "./presets/everything.ts";
import { presetMinimal } from "./presets/minimal.ts";

export const template = base.createStratumTemplate({
	about: {
		name: "Create TypeScript App",
		repository: {
			owner: "JoshuaKGoldberg",
			repository: "create-typescript-app",
		},
	},
	blocks: [
		blockAreTheTypesWrong,
		blockCTATransitions,
		blockESLintPlugin,
		blockNcc,
		blockRemoveDependencies,
		blockRemoveFiles,
		blockWebExt,
	],
	presets: [presetMinimal, presetCommon, presetEverything],
	suggested: presetCommon,
});
