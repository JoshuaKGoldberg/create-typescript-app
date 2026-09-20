import { PartialPackageData } from "../types.ts";

export async function readPnpm(packageData: () => Promise<PartialPackageData>) {
	const { packageManager } = await packageData();

	return packageManager?.startsWith("pnpm@")
		? packageManager.slice("pnpm@".length)
		: "11.22.0";
}
