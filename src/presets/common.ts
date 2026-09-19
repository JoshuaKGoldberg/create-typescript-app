import { base } from "../base.ts";
import { blockAllContributors } from "../blocks/blockAllContributors.ts";
import { blockCodecov } from "../blocks/blockCodecov.ts";
import { blockFunding } from "../blocks/blockFunding.ts";
import { blockOctoGuide } from "../blocks/blockOctoGuide.ts";
import { blockReleaseIt } from "../blocks/blockReleaseIt.ts";
import { blockVitest } from "../blocks/blockVitest.ts";
import { presetMinimal } from "./minimal.ts";

export const presetCommon = base.createPreset({
	about: {
		description:
			"Bare starters plus testing and automation for all-contributors and releases.",
		name: "Common",
	},
	blocks: [
		...presetMinimal.blocks,
		blockAllContributors,
		blockCodecov,
		blockFunding,
		blockOctoGuide,
		blockReleaseIt,
		blockVitest,
	],
});
