import { UserInfo } from "npm-user";

import { PackageAuthor } from "./readPackageAuthor.js";

export async function readEmailFromNpm(
	getNpmDefaults: () => Promise<undefined | UserInfo>,
	getPackageAuthor: () => Promise<PackageAuthor>,
) {
	return (await getNpmDefaults())?.email ?? (await getPackageAuthor()).email;
}
