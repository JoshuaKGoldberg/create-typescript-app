import parse from "parse-author";

import { PartialPackageData } from "../types.js";

export interface PackageAuthor {
	email?: string | undefined;
	name?: string | undefined;
}

export async function readPackageAuthor(
	getPackageDataFull: () => Promise<PartialPackageData>,
): Promise<PackageAuthor> {
	const packageData = await getPackageDataFull();

	switch (typeof packageData.author) {
		case "object":
			return packageData.author;

		case "string":
			return parse(packageData.author);

		default:
			return {};
	}
}
