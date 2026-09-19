import { PartialPackageData } from "../types.ts";
import { trimPrecedingSlash } from "../utils/trimPrecedingSlash.ts";

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
