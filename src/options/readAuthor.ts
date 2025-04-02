import { PackageAuthor } from "./readPackageAuthor.js";

export async function readAuthor(
	getPackageAuthor: () => Promise<PackageAuthor>,
	getNpmDefaults: () => Promise<undefined | { name?: string }>,
	owner: string | undefined,
) {
	return (
		(await getPackageAuthor()).name ?? (await getNpmDefaults())?.name ?? owner
	);
}
