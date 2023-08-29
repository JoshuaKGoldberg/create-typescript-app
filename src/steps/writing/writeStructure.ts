import { $ } from "execa";

import { Options } from "../../shared/types.js";
import { createStructure } from "./creation/index.js";
import { writeStructureWorker } from "./writeStructureWorker.js";

export async function writeStructure(options: Options) {
	await writeStructureWorker(await createStructure(options), ".");

	// https://github.com/JoshuaKGoldberg/template-typescript-node-package/issues/718
	await $`chmod ug+x .husky/pre-commit`;
}
