import { MigrationInputValues } from "../../values/types.js";
import { createStructure } from "./creation/index.js";
import { writeStructureWorker } from "./writeStructureWorker.js";

export async function writeStructure(values: MigrationInputValues) {
	await writeStructureWorker(await createStructure(values), ".");
}
