import { base } from "../base.ts";
import { blockPrettier } from "./blockPrettier.ts";

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
