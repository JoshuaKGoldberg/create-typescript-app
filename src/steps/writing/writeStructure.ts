import { InputValues } from "../../shared/readInputs.js";
import { createStructure } from "./creation/index.js";
import { writeStructureWorker } from "./writeStructureWorker.js";

export async function writeStructure(values: InputValues) {
	await writeStructureWorker(await createStructure(values), ".");
}
