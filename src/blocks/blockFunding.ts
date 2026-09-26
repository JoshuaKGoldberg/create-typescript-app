import { base } from "../base.ts";
import { formatYaml } from "./files/formatYaml.ts";
import { withPreviously } from "./files/withPreviously.ts";

export const blockFunding = base.createBlock({
	about: {
		name: "Funding",
	},
	produce({ options }) {
		return {
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
});
