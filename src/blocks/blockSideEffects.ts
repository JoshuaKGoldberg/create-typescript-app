import { z } from "zod";

import { base } from "../base.js";
import { blockPackageJson } from "./blockPackageJson.js";

export const blockSideEffects = base.createBlock({
	about: {
		name: "Side Effects",
	},
	addons: {
		sideEffects: z.union([z.boolean(), z.array(z.string())]).optional(),
	},
	produce({ addons }) {
		const { sideEffects = false } = addons;

		return {
			addons: [
				blockPackageJson({
					properties: {
						sideEffects,
					},
				}),
			],
		};
	},
});
