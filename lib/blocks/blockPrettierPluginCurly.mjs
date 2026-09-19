import { base } from "../base.mjs";
import { blockPrettier } from "./blockPrettier.mjs";
//#region src/blocks/blockPrettierPluginCurly.ts
const blockPrettierPluginCurly = base.createBlock({
	about: { name: "Prettier Plugin Curly" },
	produce() {
		return { addons: [blockPrettier({ plugins: ["prettier-plugin-curly"] })] };
	}
});
//#endregion
export { blockPrettierPluginCurly };
