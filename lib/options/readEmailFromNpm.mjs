//#region src/options/readEmailFromNpm.ts
async function readEmailFromNpm(getNpmDefaults, getPackageAuthor) {
	return (await getNpmDefaults())?.email ?? (await getPackageAuthor()).email;
}
//#endregion
export { readEmailFromNpm };
