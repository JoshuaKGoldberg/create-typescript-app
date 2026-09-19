import { PartialPackageData } from "../types.mjs";
import { GitUrl } from "git-url-parse";
//#region src/options/readRepository.d.ts
declare function readRepository(getGitDefaults: () => Promise<GitUrl | undefined>, getPackageDataFull: () => Promise<PartialPackageData>, options: {
  directory?: string;
  repository?: string;
}): Promise<string | undefined>;
//#endregion
export { readRepository };