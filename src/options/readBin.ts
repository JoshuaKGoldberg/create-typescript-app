import { PartialPackageData } from "../types.ts";
import { trimPrecedingSlash } from "../utils/trimPrecedingSlash.ts";

export async function readBin(
	getPackageData: () => Promise<PartialPackageData>,
) {
	const { bin } = await getPackageData();

	return typeof bin === "object"
		? (Object.fromEntries(
				Object.entries(bin).map(([key, value]) => [key, normalizeBin(value)]),
			) as typeof bin)
		: normalizeBin(bin);
}

function normalizeBin(bin: string | undefined) {
	return trimPrecedingSlash(bin)?.replace(/^lib\//u, "dist/");
}
