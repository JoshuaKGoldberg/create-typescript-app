import { base } from "../base.mjs";
import { blockPrettier } from "./blockPrettier.mjs";
//#region src/blocks/blockPrettierPluginPackageJson.ts
const blockPrettierPluginPackageJson = base.createBlock({
	about: { name: "Prettier Plugin Package JSON" },
	produce() {
		return { addons: [blockPrettier({ plugins: ["prettier-plugin-packagejson"] })] };
	}
});
//#endregion
export { blockPrettierPluginPackageJson };
