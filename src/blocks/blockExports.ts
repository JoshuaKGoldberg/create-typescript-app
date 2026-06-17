import { z } from "zod";

import { base } from "../base.js";
import { blockPackageJson } from "./blockPackageJson.js";
import { blockTSDown } from "./blockTSDown.js";

export const blockExports = base.createBlock({
	about: {
		name: "Exports",
	},
	addons: {
		filePath: z.string().optional(),
		runArgs: z.array(z.string()).default([]),
	},
	produce({ addons }) {
		const { filePath = "./lib/index.js", runArgs } = addons;

		return {
			addons: [
				blockPackageJson({
					properties: {
						exports: {
							".": filePath.startsWith(".") ? filePath : `./${filePath}`,
						},
					},
				}),
				blockTSDown({
					runInCI: [
						`node ${filePath}${runArgs.map((arg) => ` ${arg}`).join("")}`,
					],
				}),
			],
		};
	},
});
