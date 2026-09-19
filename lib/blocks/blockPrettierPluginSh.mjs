import { base } from "../base.mjs";
import { blockPrettier } from "./blockPrettier.mjs";
//#region src/blocks/blockPrettierPluginSh.ts
const blockPrettierPluginSh = base.createBlock({
	about: { name: "Prettier Plugin Sh" },
	produce() {
		return { addons: [blockPrettier({ plugins: ["prettier-plugin-sh"] })] };
	}
});
//#endregion
export { blockPrettierPluginSh };
