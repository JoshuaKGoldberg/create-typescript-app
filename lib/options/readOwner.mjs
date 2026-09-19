import { inputFromScript } from "input-from-script";
//#region src/options/readOwner.ts
async function readOwner(take, getGitDefaults, getPackageAuthor) {
	return (await getGitDefaults())?.organization ?? (await take(inputFromScript, { command: "gh config get user -h github.com" })).stdout?.toString() ?? (await getPackageAuthor()).name;
}
//#endregion
export { readOwner };
