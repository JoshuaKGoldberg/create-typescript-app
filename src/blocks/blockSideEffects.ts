import { z } from "zod";

import { base } from "../base.ts";
import { blockPackageJson } from "./blockPackageJson.ts";

export const blockSideEffects = base.createBlock({
	about: {
		name: "Side Effects",
	},
	produce({ props }) {
		const { sideEffects = false } = props;

		return {
			extensions: [
				blockPackageJson({
					properties: {
						sideEffects,
					},
				}),
			],
		};
	},
	props: {
		sideEffects: z.union([z.boolean(), z.array(z.string())]).optional(),
	},
});
