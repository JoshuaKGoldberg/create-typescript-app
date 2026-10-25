import { z } from "zod";

import { base } from "../base.ts";
import { blockTSDown } from "./blockTSDown.ts";
import { blockVite } from "./blockVite.ts";
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

		return filePath ? { filePath: libToDist(filePath) } : undefined;
	},
	produce({ addons, options }) {
		const { filePath = "./dist/index.mjs", runArgs } = addons;
		const main = zFilePath.safeParse(options.packageData?.main).data;
		const runArgsText = runArgs.map((arg) => ` ${arg}`).join("");

		return {
			addons: [
				// The entry point is built by tsdown, so it's only set when tsdown is used
				blockTSDown({
					exports: filePath.startsWith(".") ? filePath : `./${filePath}`,
					...(main && { main: libToDist(main) }),
					runInCI: [`node ${filePath}${runArgsText}`],
				}),
				// Vite always builds the entry point to the same path
				blockVite({
					runInCI: [`node ./dist/index.mjs${runArgsText}`],
				}),
			],
		};
	},
});

function libToDist(filePath: string) {
	return filePath.replace(/^(?:\.\/)?lib\//u, "./dist/");
}
