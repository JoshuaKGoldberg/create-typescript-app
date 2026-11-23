import { z } from "zod";

import { base } from "../base.ts";
import { blockPackageJson } from "./blockPackageJson.ts";
import { intakeFileAsJson } from "./intake/intakeFileAsJson.ts";

const zSideEffects = z.union([z.boolean(), z.array(z.string())]);

export const blockSideEffects = base.createBlock({
	about: {
		name: "Side Effects",
	},
	intake({ files }) {
		const { data: sideEffects } = zSideEffects.safeParse(
			intakeFileAsJson(files, ["package.json"])?.sideEffects,
		);

		return sideEffects === undefined ? undefined : { sideEffects };
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
		sideEffects: zSideEffects.optional(),
	},
});
