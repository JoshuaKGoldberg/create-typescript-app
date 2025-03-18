export async function readEmails(
	getEmailFromCodeOfConduct: () => Promise<string | undefined>,
	getEmailFromGit: () => Promise<string | undefined>,
	getEmailFromNpm: () => Promise<string | undefined>,
) {
	const github =
		(await getEmailFromCodeOfConduct()) ?? (await getEmailFromGit());
	const npm = (await getEmailFromNpm()) ?? github;

	return npm ? { github: github || npm, npm } : undefined;
}
