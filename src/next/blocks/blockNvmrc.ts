import { MetadataFileType } from "create";

import { schema } from "../schema.js";

export const blockNvmrc = schema.createBlock({
	about: {
		name: "Nvmrc",
	},
	produce({ options }) {
		return {
			metadata: [
				{ glob: ".nvmrc", parser: "yaml", type: MetadataFileType.Config },
			],
			...(options.node && {
				files: {
					".nvmrc": `${options.node.pinned}\n`,
				},
				package: {
					engines: {
						node: `>=${options.node.minimum}`,
					},
				},
			}),
		};
	},
});
