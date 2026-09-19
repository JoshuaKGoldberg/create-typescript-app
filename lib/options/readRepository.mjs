//#region src/options/readRepository.ts
async function readRepository(getGitDefaults, getPackageDataFull, options) {
	return options.repository ?? (await getGitDefaults())?.name ?? (await getPackageDataFull()).name ?? options.directory;
}
//#endregion
export { readRepository };
