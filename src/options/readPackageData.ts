import { PartialPackageData } from "../types.js";
import { readFileSafe } from "./readFileSafe.js";

export async function readPackageData() {
	return (
		(JSON.parse(await readFileSafe("./package.json", "{}")) as
			| PartialPackageData
			| undefined) ?? {}
	);
}
