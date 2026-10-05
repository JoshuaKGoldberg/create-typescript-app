import { base } from "../base.ts";
import { blockCSpell } from "./blockCSpell.ts";
import { blockRemoveFiles } from "./blockRemoveFiles.ts";
import { formatYaml } from "./files/formatYaml.ts";
import { withPreviously } from "./files/withPreviously.ts";

export const blockFunding = base.createBlock({
	about: {
		name: "Funding",
	},
	produce({ options }) {
		return {
			addons: options.funding
				? [blockCSpell({ words: [options.funding] })]
				: [],
			files: {
				".github": {
					"FUNDING.yaml": withPreviously(
						options.funding && formatYaml({ github: options.funding }),
						["FUNDING.yml"],
					),
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
