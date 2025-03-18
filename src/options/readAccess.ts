import { PartialPackageData } from "../types.js";

export async function readAccess(
	getPackageDataFull: () => Promise<PartialPackageData | undefined>,
) {
	return (await getPackageDataFull())?.publishConfig?.access ?? "public";
}
