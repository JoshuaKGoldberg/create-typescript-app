import { z } from "zod";

import { base } from "../base.js";

export const blockExampleFiles = base.createBlock({
	about: {
		name: "Example Files",
	},
	addons: {
		files: z.record(z.string()).default({}),
	},
	setup({ addons }) {
		return {
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
