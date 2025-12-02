import { base } from "../base.js";
import { blockPrettier } from "./blockPrettier.js";

export const blockPrettierPluginSentencesPerLine = base.createBlock({
	about: {
		name: "Prettier Plugin Sentences Per Line",
	},
	produce() {
		return {
			addons: [
				blockPrettier({
					plugins: ["prettier-plugin-sentences-per-line"],
				}),
			],
		};
	},
});
