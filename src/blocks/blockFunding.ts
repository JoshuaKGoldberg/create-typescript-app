import { base } from "../base.js";
import { blockRemoveFiles } from "./blockRemoveFiles.js";
import { formatYaml } from "./files/formatYaml.js";

export const blockFunding = base.createBlock({
	about: {
		name: "Funding",
	},
	produce({ options }) {
		return {
			files: {
				".github": {
					"FUNDING.yaml":
						options.funding && formatYaml({ github: options.funding }),
				},
			},
		};
	},
	transition() {
		return {
			addons: [
				blockRemoveFiles({
					files: [".github/FUNDING.yml"],
				}),
			],
		};
	},
});
