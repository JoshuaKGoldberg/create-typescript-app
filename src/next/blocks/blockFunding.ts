import { formatYaml } from "../../steps/writing/creation/formatters/formatYaml.js";
import { schema } from "../schema.js";

export const blockFunding = schema.createBlock({
	about: {
		name: "Funding",
	},
	async produce({ options }) {
		return {
			files: {
				".github": {
					"FUNDING.yml":
						options.funding && (await formatYaml({ github: options.funding })),
				},
			},
		};
	},
});
