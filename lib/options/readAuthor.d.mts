import { PackageAuthor } from "./readPackageAuthor.mjs";
import { ExecaError, Result } from "execa";
//#region src/options/readAuthor.d.ts
declare function readAuthor(getPackageAuthor: () => Promise<PackageAuthor>, getNpmDefaults: () => Promise<undefined | {
  name?: string;
}>, getGitUser: () => Promise<ExecaError | Result | undefined>, owner: string | undefined): Promise<string | undefined>;
//#endregion
export { readAuthor };