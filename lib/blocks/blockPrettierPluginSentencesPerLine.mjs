import { base } from "../base.mjs";
import { blockPrettier } from "./blockPrettier.mjs";
//#region src/blocks/blockPrettierPluginSentencesPerLine.ts
const blockPrettierPluginSentencesPerLine = base.createBlock({
	about: { name: "Prettier Plugin Sentences Per Line" },
	produce() {
		return { addons: [blockPrettier({ plugins: ["prettier-plugin-sentences-per-line"] })] };
	}
});
//#endregion
export { blockPrettierPluginSentencesPerLine };
