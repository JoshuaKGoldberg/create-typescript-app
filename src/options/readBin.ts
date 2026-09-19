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

// Repositories created before build output moved from lib/ to dist/ may
// point their bin directly at built output; those are migrated to dist/.
function normalizeBin(bin: string | undefined) {
	return trimPrecedingSlash(bin)?.replace(/^lib\//u, "dist/");
}
