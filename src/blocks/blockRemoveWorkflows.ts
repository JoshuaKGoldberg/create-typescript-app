import { z } from "zod";

import { base } from "../base.js";
import { blockRemoveFiles } from "./blockRemoveFiles.js";

export const blockRemoveWorkflows = base.createBlock({
	about: {
		name: "Remove Workflows",
	},
	addons: {
		workflows: z.array(z.string()).optional(),
	},
	// TODO: Make produce() optional, so this empty-ish produce() can be removed
	// https://github.com/JoshuaKGoldberg/bingo/issues/295
	produce() {
		return {};
	},
	transition({ addons }) {
		const { workflows } = addons;

		return {
			addons: [
				blockRemoveFiles({
					files: workflows?.map(
						(workflow) => `.github/workflows/${workflow}.yml`,
					),
				}),
			],
		};
	},
});
