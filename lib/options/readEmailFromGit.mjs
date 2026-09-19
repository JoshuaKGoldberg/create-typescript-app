import { inputFromScript } from "input-from-script";
//#region src/options/readEmailFromGit.ts
async function readEmailFromGit(take) {
	return (await take(inputFromScript, { command: "git config --get user.email" })).stdout?.toString();
}
//#endregion
export { readEmailFromGit };
