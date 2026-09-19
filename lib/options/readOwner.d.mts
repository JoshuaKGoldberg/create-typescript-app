import { PackageAuthor } from "./readPackageAuthor.mjs";
import { TakeInput } from "bingo";
import { GitUrl } from "git-url-parse";
//#region src/options/readOwner.d.ts
declare function readOwner(take: TakeInput, getGitDefaults: () => Promise<GitUrl | undefined>, getPackageAuthor: () => Promise<PackageAuthor>): Promise<string | undefined>;
//#endregion
export { readOwner };