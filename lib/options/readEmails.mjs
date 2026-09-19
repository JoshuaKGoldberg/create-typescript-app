//#region src/options/readEmails.ts
async function readEmails(getEmailFromCodeOfConduct, getEmailFromGit, getEmailFromNpm, getPackageAuthor) {
	const github = await getEmailFromCodeOfConduct() ?? await getEmailFromGit();
	const npm = (await getPackageAuthor()).email ?? await getEmailFromNpm() ?? github;
	return npm ? {
		github: github || npm,
		npm
	} : void 0;
}
//#endregion
export { readEmails };
