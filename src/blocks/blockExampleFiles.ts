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
	// TODO: Make produce() optional
	// This needs createBlock to be generic to know if block.produce({}) is ok
	produce() {
		return {};
	},
});
