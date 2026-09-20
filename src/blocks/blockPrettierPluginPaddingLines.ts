import { base } from "../base.ts";
import { blockPrettier } from "./blockPrettier.ts";

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
