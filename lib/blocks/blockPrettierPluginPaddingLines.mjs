import { base } from "../base.mjs";
import { blockPrettier } from "./blockPrettier.mjs";
//#region src/blocks/blockPrettierPluginPaddingLines.ts
const blockPrettierPluginPaddingLines = base.createBlock({
	about: { name: "Prettier Plugin Padding Lines" },
	produce() {
		return { addons: [blockPrettier({ plugins: ["prettier-plugin-padding-lines"] })] };
	}
});
//#endregion
export { blockPrettierPluginPaddingLines };
