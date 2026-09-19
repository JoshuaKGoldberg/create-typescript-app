import { PartialPackageData } from "../types.ts";

export async function readAccess(
	getPackageDataFull: () => Promise<PartialPackageData | undefined>,
) {
	return (await getPackageDataFull())?.publishConfig?.access ?? "public";
}
