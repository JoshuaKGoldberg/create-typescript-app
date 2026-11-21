import { base } from "../base.ts";
import { blockOctoGuide } from "./blockOctoGuide.ts";

export const blockOctoGuideStrict = base.createBlock({
	about: {
		name: "OctoGuide Strict",
	},
	produce() {
		return {
			extensions: [
				blockOctoGuide({
					config: "strict",
				}),
			],
		};
	},
});
