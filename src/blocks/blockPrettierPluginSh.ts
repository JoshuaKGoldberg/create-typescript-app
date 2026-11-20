import { base } from "../base.ts";
import { blockPrettier } from "./blockPrettier.ts";

export const blockPrettierPluginSh = base.createBlock({
	about: {
		name: "Prettier Plugin Sh",
	},
	produce() {
		return {
			extensions: [
				blockPrettier({
					plugins: ["prettier-plugin-sh"],
				}),
			],
		};
	},
});
