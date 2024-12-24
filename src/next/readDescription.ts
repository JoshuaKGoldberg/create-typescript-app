import { PartialPackageData } from "../shared/types.js";
import { sourcePackageJson } from "./blocks/sourcePackageJson.js";

export async function readDescription(
	getPackageData: () => Promise<PartialPackageData>,
) {
	const { description: inferred } = await getPackageData();
	const { description: existing } = sourcePackageJson;

	return existing === inferred ? undefined : inferred;
}
