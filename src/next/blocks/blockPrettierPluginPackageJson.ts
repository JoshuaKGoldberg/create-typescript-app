import { base } from "../base.js";
import { blockPrettier } from "./blockPrettier.js";

export const blockPrettierPluginPackageJson = base.createBlock({
	about: {
		name: "Prettier Plugin Package JSON",
	},
	produce() {
		return {
			addons: [
				blockPrettier({
					plugins: ["prettier-plugin-packagejson"],
				}),
			],
		};
	},
});
