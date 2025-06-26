import { PartialPackageData } from "../types.js";

export async function readKeywords(
	getPackageData: () => Promise<PartialPackageData>,
) {
	const { keywords } = await getPackageData();

	return (
		keywords && Array.from(new Set((await getPackageData()).keywords)).sort()
	);
}
