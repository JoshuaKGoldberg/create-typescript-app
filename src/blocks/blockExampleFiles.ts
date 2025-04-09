import { z } from "zod";

import { base } from "../base.js";
import { blockREADME } from "./blockREADME.js";

export const blockExampleFiles = base.createBlock({
	about: {
		name: "Example Files",
	},
	addons: {
		files: z.record(z.string()).default({}),
		usage: z.array(z.string()).default([]),
	},
	setup({ addons }) {
		const { usage } = addons;

		return {
			addons: [
				blockREADME({
					defaultUsage: usage,
				}),
			],
			files: {
				src: addons.files,
			},
		};
	},
	// TODO: Make produce() optional, so this empty-ish produce() can be removed
	// https://github.com/JoshuaKGoldberg/bingo/issues/295
	produce() {
		return {};
	},
});
