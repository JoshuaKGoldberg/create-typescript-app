//#region src/options/readAuthor.ts
async function readAuthor(getPackageAuthor, getNpmDefaults, getGitUser, owner) {
	return (await getPackageAuthor()).name ?? (await getNpmDefaults())?.name ?? (await getGitUser())?.stdout?.toString() ?? owner;
}
//#endregion
export { readAuthor };
