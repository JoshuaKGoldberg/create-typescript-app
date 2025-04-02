import { PackageAuthor } from "./readPackageAuthor.js";

export async function readEmails(
	getEmailFromCodeOfConduct: () => Promise<string | undefined>,
	getEmailFromGit: () => Promise<string | undefined>,
	getEmailFromNpm: () => Promise<string | undefined>,
	getPackageAuthor: () => Promise<PackageAuthor>,
) {
	const github =
		(await getEmailFromCodeOfConduct()) ?? (await getEmailFromGit());
	const npm =
		(await getPackageAuthor()).email ?? (await getEmailFromNpm()) ?? github;

	return npm ? { github: github || npm, npm } : undefined;
}
