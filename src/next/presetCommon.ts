import { base } from "./base.js";
import { blockAllContributors } from "./blocks/blockAllContributors.js";
import { blockReleaseIt } from "./blocks/blockReleaseIt.js";
import { blockVitest } from "./blocks/blockVitest.js";
import { presetMinimal } from "./presetMinimal.js";

export const presetCommon = base.createPreset({
	about: {
		description:
			"Bare starters plus testing and automation for all-contributors and releases.",
		name: "Common",
	},
	blocks: [
		...presetMinimal.blocks,
		blockAllContributors,
		blockReleaseIt,
		blockVitest,
	],
});
