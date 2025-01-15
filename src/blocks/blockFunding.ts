import { base } from "../base.js";
import { formatYaml } from "./files/formatYaml.js";

export const blockFunding = base.createBlock({
	about: {
		name: "Funding",
	},
	produce({ options }) {
		return {
			files: {
				".github": {
					"FUNDING.yml":
						options.funding && formatYaml({ github: options.funding }),
				},
			},
		};
	},
});
