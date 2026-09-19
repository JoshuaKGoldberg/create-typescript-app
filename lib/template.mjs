import { base } from "./base.mjs";
import { blockRemoveFiles } from "./blocks/blockRemoveFiles.mjs";
import { blockAreTheTypesWrong } from "./blocks/blockAreTheTypesWrong.mjs";
import { blockCTATransitions } from "./blocks/blockCTATransitions.mjs";
import { blockRemoveDependencies } from "./blocks/blockRemoveDependencies.mjs";
import { blockESLintPlugin } from "./blocks/blockESLintPlugin.mjs";
import { blockNcc } from "./blocks/blockNcc.mjs";
import { blockWebExt } from "./blocks/blockWebExt.mjs";
import { presetMinimal } from "./presets/minimal.mjs";
import { presetCommon } from "./presets/common.mjs";
import { presetEverything } from "./presets/everything.mjs";
//#region src/template.ts
const template = base.createStratumTemplate({
	about: {
		name: "Create TypeScript App",
		repository: {
			owner: "JoshuaKGoldberg",
			repository: "create-typescript-app"
		}
	},
	blocks: [
		blockAreTheTypesWrong,
		blockCTATransitions,
		blockESLintPlugin,
		blockNcc,
		blockRemoveDependencies,
		blockRemoveFiles,
		blockWebExt
	],
	presets: [
		presetMinimal,
		presetCommon,
		presetEverything
	],
	suggested: presetCommon
});
//#endregion
export { template };
