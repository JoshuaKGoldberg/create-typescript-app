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
	produce({ options, props }) {
		const { filePath = "./dist/index.mjs", runArgs } = props;
		const main = zFilePath.safeParse(options.packageData?.main).data;
		const runArgsText = runArgs.map((arg) => ` ${arg}`).join("");

		return {
			extensions: [
				// The entry point is built by tsdown, so it's only set when tsdown is used
				blockTSDown({
					exports: filePath.startsWith(".") ? filePath : `./${filePath}`,
					...(main && { main: libToDist(main) }),
					runInCI: [`node ${filePath}${runArgsText}`],
				}),
				blockVite({
					runInCI: [`node ./dist/index.mjs${runArgsText}`],
				}),
			],
		};
	},
	props: {
		filePath: zFilePath.optional(),
		runArgs: z.array(z.string()).default([]),
	},
});

function libToDist(filePath: string) {
	return filePath.replace(/^(?:\.\/)?lib\//u, "./dist/");
}
