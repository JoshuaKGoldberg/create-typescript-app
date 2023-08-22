import { InputValues } from "../../shared/inputs.js";
import { createStructure } from "./creation/index.js";
import { writeStructureWorker } from "./writeStructureWorker.js";

export async function writeStructure(values: InputValues) {
	await writeStructureWorker(await createStructure(values), ".");
}
