import { base } from "../base.ts";
import { blockPrettier } from "./blockPrettier.ts";

export const blockPrettierPluginCurly = base.createBlock({
	about: {
		name: "Prettier Plugin Curly",
	},
	produce() {
		return {
			addons: [
				blockPrettier({
					plugins: ["prettier-plugin-curly"],
				}),
			],
		};
	},
});
