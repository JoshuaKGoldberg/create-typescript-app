import { PartialPackageData } from "../types.mjs";
//#region src/options/readPackageAuthor.d.ts
interface PackageAuthor {
  email?: string | undefined;
  name?: string | undefined;
}
declare function readPackageAuthor(getPackageDataFull: () => Promise<PartialPackageData>): Promise<PackageAuthor>;
//#endregion
export { PackageAuthor, readPackageAuthor };