import { ExecaError, Result } from "execa";

import { PackageAuthor } from "./readPackageAuthor.js";

export async function readAuthor(
	getPackageAuthor: () => Promise<PackageAuthor>,
	getNpmDefaults: () => Promise<undefined | { name?: string }>,
	getGitUser: () => Promise<ExecaError | Result | undefined>,
	owner: string | undefined,
) {
	return (
		(await getPackageAuthor()).name ??
		(await getNpmDefaults())?.name ??
		(await getGitUser())?.stdout?.toString() ??
		owner
	);
}
