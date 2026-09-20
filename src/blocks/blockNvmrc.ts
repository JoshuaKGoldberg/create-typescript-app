import { base } from "../base.ts";
import { blockPrettier } from "./blockPrettier.ts";

export const blockNvmrc = base.createBlock({
	about: {
		name: "Nvmrc",
	},
	produce({ options }) {
		return {
			addons: [
				blockPrettier({
					overrides: [{ files: ".nvmrc", options: { parser: "yaml" } }],
				}),
			],
			...(options.node.pinned && {
				files: {
					".nvmrc": `${options.node.pinned}\n`,
				},
			}),
		};
	},
});
