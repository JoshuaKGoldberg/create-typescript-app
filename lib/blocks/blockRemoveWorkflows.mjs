import { base } from "../base.mjs";
import { blockRemoveFiles } from "./blockRemoveFiles.mjs";
import { z } from "zod";
//#region src/blocks/blockRemoveWorkflows.ts
const blockRemoveWorkflows = base.createBlock({
	about: { name: "Remove Workflows" },
	addons: { workflows: z.array(z.string()).optional() },
	produce() {
		return {};
	},
	transition({ addons }) {
		const { workflows } = addons;
		return { addons: [blockRemoveFiles({ files: workflows?.map((workflow) => `.github/workflows/${workflow}.{yaml,yml}`) })] };
	}
});
//#endregion
export { blockRemoveWorkflows };
