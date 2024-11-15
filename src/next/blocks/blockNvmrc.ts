import { schema } from "../schema.js";
import { blockPackageJson } from "./blockPackageJson.js";
import { MetadataFileType } from "./metadata.js";

export const blockNvmrc = schema.createBlock({
	about: {
		name: "Nvmrc",
	},
	produce({ options }) {
		return {
			...(options.node && {
				addons: [
					blockPackageJson({
						properties: {
							engine: {
								node: `>=${options.node.minimum}`,
							},
						},
					}),
				],
				...(options.node.pinned && {
					files: {
						".nvmrc": `${options.node.pinned}\n`,
					},
				}),
			}),
			metadata: {
				files: [
					{ glob: ".nvmrc", language: "yaml", type: MetadataFileType.Config },
				],
			},
		};
	},
});
