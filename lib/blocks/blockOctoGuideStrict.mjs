import { base } from "../base.mjs";
import { blockOctoGuide } from "./blockOctoGuide.mjs";
//#region src/blocks/blockOctoGuideStrict.ts
const blockOctoGuideStrict = base.createBlock({
	about: { name: "OctoGuide Strict" },
	produce() {
		return { addons: [blockOctoGuide({ config: "strict" })] };
	}
});
//#endregion
export { blockOctoGuideStrict };
