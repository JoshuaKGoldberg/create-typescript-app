import { base } from "../base.ts";
import { blockRemoveFiles } from "./blockRemoveFiles.ts";
import { formatYaml } from "./files/formatYaml.ts";

export const blockFunding = base.createBlock({
	about: {
		name: "Funding",
	},
	legacyFiles: {
		".github/FUNDING.yml": ".github/FUNDING.yaml",
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
