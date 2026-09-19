import { base } from "../base.mjs";
import { blockRemoveFiles } from "./blockRemoveFiles.mjs";
import { formatYaml } from "./files/formatYaml.mjs";
//#region src/blocks/blockFunding.ts
const blockFunding = base.createBlock({
	about: { name: "Funding" },
	produce({ options }) {
		return { files: { ".github": { "FUNDING.yaml": options.funding && formatYaml({ github: options.funding }) } } };
	},
	transition() {
		return { addons: [blockRemoveFiles({ files: [".github/FUNDING.yml"] })] };
	}
});
//#endregion
export { blockFunding };
