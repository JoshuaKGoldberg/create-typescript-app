import { base } from "../base.js";
import { blockPrettier } from "./blockPrettier.js";

export const blockPrettierPluginPaddingLines = base.createBlock({
	about: {
		name: "Prettier Plugin Padding Lines",
	},
	produce() {
		return {
			addons: [
				blockPrettier({
					plugins: ["prettier-plugin-padding-lines"],
				}),
			],
		};
	},
});
