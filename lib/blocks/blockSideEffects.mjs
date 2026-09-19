import { base } from "../base.mjs";
import { blockPackageJson } from "./blockPackageJson.mjs";
import { z } from "zod";
//#region src/blocks/blockSideEffects.ts
const blockSideEffects = base.createBlock({
	about: { name: "Side Effects" },
	addons: { sideEffects: z.union([z.boolean(), z.array(z.string())]).optional() },
	produce({ addons }) {
		const { sideEffects = false } = addons;
		return { addons: [blockPackageJson({ properties: { sideEffects } })] };
	}
});
//#endregion
export { blockSideEffects };
