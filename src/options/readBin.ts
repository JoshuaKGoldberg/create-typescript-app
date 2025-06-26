import { PartialPackageData } from "../types.js";
import { trimPrecedingSlash } from "../utils/trimPrecedingSlash.js";

export async function readBin(
	getPackageData: () => Promise<PartialPackageData>,
) {
	const { bin } = await getPackageData();

	return typeof bin === "object"
		? (Object.fromEntries(
				Object.entries(bin).map(([key, value]) => [
					key,
					trimPrecedingSlash(value),
				]),
			) as typeof bin)
		: trimPrecedingSlash(bin);
}
