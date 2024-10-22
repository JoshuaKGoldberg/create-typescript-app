import { MetadataFileType } from "create";

import { schema } from "../schema.js";

export const blockNvmrc = schema.createBlock({
	about: {
		name: "Nvmrc",
	},
	produce({ options }) {
		return {
			files: {
				".nvmrc": `${options.node.pinned}\n`,
			},
			metadata: [
				{ glob: ".nvmrc", parser: "yaml", type: MetadataFileType.Config },
			],
			package: {
				engines: {
					node: `>=${options.node.minimum}`,
				},
			},
		};
	},
});
