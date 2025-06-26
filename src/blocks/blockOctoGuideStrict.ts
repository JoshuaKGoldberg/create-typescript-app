import { base } from "../base.js";
import { blockOctoGuide } from "./blockOctoGuide.js";

export const blockOctoGuideStrict = base.createBlock({
	about: {
		name: "OctoGuide Strict",
	},
	produce() {
		return {
			addons: [
				blockOctoGuide({
					config: "strict",
				}),
			],
		};
	},
});
