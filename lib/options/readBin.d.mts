import { PartialPackageData } from "../types.mjs";
//#region src/options/readBin.d.ts
declare function readBin(getPackageData: () => Promise<PartialPackageData>): Promise<string | Record<string, string> | undefined>;
//#endregion
export { readBin };