import { TakeInput } from "bingo";
import gitUrlParse from "git-url-parse";
//#region src/options/readGitDefaults.d.ts
declare function readGitDefaults(take: TakeInput): Promise<gitUrlParse.GitUrl | undefined>;
//#endregion
export { readGitDefaults };