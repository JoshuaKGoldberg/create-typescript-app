import { z } from "zod";

import { base } from "../base.ts";
import { blockPackageJson } from "./blockPackageJson.ts";
import { blockTSDown } from "./blockTSDown.ts";
import { intakeFileAsJson } from "./intake/intakeFileAsJson.ts";

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
		const packageData = intakeFileAsJson(files, ["package.json"]);
		const exports = zExports.safeParse(packageData?.exports).data;
		const filePath =
			packageData?.exports === undefined
				? zFilePath.safeParse(packageData?.main).data
				: typeof exports === "string"
					? exports
					: exports?.["."];

		return filePath
			? { filePath: filePath.replace(/^(?:\.\/)?lib\//u, "./dist/") }
			: undefined;
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
