import { z } from "zod";

import { base } from "../base.js";

export const blockExampleFiles = base.createBlock({
	about: {
		name: "Example Files",
	},
	addons: {
		files: z.record(z.string()).default({}),
	},
	initialize({ addons }) {
		return {
			files: {
				src: addons.files,
			},
		};
	},
	// TODO: Make produce() optional (so base is generic on its definition)
	produce() {
		return {};
	},
});
