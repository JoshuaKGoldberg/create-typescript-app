import { base } from "../base.ts";
import { blockPrettier } from "./blockPrettier.ts";

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
