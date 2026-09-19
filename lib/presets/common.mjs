import { base } from "../base.mjs";
import { blockReleaseIt } from "../blocks/blockReleaseIt.mjs";
import { blockVitest } from "../blocks/blockVitest.mjs";
import { blockAllContributors } from "../blocks/blockAllContributors.mjs";
import { blockCodecov } from "../blocks/blockCodecov.mjs";
import { blockFunding } from "../blocks/blockFunding.mjs";
import { blockOctoGuide } from "../blocks/blockOctoGuide.mjs";
import { presetMinimal } from "./minimal.mjs";
//#region src/presets/common.ts
const presetCommon = base.createPreset({
	about: {
		description: "Bare starters plus testing and automation for all-contributors and releases.",
		name: "Common"
	},
	blocks: [
		...presetMinimal.blocks,
		blockAllContributors,
		blockCodecov,
		blockFunding,
		blockOctoGuide,
		blockReleaseIt,
		blockVitest
	]
});
//#endregion
export { presetCommon };
