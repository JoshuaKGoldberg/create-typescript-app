import { $ } from "execa";

import { Mode } from "../../bin/mode.js";
import { Options } from "../../shared/types.js";
import { createStructure } from "./creation/index.js";
import { writeStructureWorker } from "./writeStructureWorker.js";

export async function writeStructure(options: Options, mode: Mode) {
	await writeStructureWorker(await createStructure(options, mode), ".");

	// https://github.com/JoshuaKGoldberg/create-typescript-app/issues/718
	await $`chmod ug+x .husky/pre-commit`;
}
