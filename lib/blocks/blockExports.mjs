import { base } from "../base.mjs";
import { blockPackageJson } from "./blockPackageJson.mjs";
import { intakeFileAsJson } from "./intake/intakeFileAsJson.mjs";
import { blockTSDown } from "./blockTSDown.mjs";
import { z } from "zod";
//#region src/blocks/blockExports.ts
const zFilePath = z.string();
const zExports = z.union([zFilePath, z.object({ ".": zFilePath })]);
const blockExports = base.createBlock({
	about: { name: "Exports" },
	addons: {
		filePath: zFilePath.optional(),
		runArgs: z.array(z.string()).default([])
	},
	intake({ files }) {
		const exports = zExports.safeParse(intakeFileAsJson(files, ["package.json"])?.exports).data;
		const filePath = typeof exports === "string" ? exports : exports?.["."];
		return filePath ? { filePath } : void 0;
	},
	produce({ addons }) {
		const { filePath = "./lib/index.mjs", runArgs } = addons;
		return { addons: [blockPackageJson({ properties: { exports: { ".": filePath.startsWith(".") ? filePath : `./${filePath}` } } }), blockTSDown({ runInCI: [`node ${filePath}${runArgs.map((arg) => ` ${arg}`).join("")}`] })] };
	}
});
//#endregion
export { blockExports };
