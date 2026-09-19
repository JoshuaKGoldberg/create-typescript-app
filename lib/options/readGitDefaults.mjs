import { inputFromScript } from "input-from-script";
import gitUrlParse from "git-url-parse";
//#region src/options/readGitDefaults.ts
async function readGitDefaults(take) {
	const url = await take(inputFromScript, { command: "git remote get-url origin" });
	return url.stdout ? gitUrlParse(url.stdout.toString()) : void 0;
}
//#endregion
export { readGitDefaults };
