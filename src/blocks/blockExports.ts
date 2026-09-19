import { z } from "zod";

import { base } from "../base.js";
import { blockPackageJson } from "./blockPackageJson.js";
import { blockTSDown } from "./blockTSDown.js";
import { intakeFileAsJson } from "./intake/intakeFileAsJson.js";

const zFilePath = z.string();
const zExports = z.union([zFilePath, z.object({ ".": zFilePath })]);

export const blockExports = base.createBlock({
	about: {
		name: "Exports",
	},
	addons: {
		filePath: zFilePath.optional(),
		runArgs: z.array(z.string()).default([]),
	},
	intake({ files }) {
		const exports = zExports.safeParse(
			intakeFileAsJson(files, ["package.json"])?.exports,
		).data;
		const filePath = typeof exports === "string" ? exports : exports?.["."];

		return filePath ? { filePath } : undefined;
	},
	produce({ addons }) {
		const { filePath = "./dist/index.mjs", runArgs } = addons;

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
