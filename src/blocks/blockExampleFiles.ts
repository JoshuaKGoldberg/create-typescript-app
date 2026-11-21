import { z } from "zod";

import { base } from "../base.ts";
import { blockREADME } from "./blockREADME.ts";

export const blockExampleFiles = base.createBlock({
	about: {
		name: "Example Files",
	},
	props: {
		files: z.record(z.string(), z.string()).default({}),
		usage: z.array(z.string()).default([]),
	},
	setup({ props }) {
		const { usage } = props;

		return {
			extensions: [
				blockREADME({
					defaultUsage: usage,
				}),
			],
			files: {
				src: props.files,
			},
		};
	},
	// TODO: Make produce() optional, so this empty-ish produce() can be removed
	// https://github.com/JoshuaKGoldberg/bingo/issues/295
	produce() {
		return {};
	},
});
