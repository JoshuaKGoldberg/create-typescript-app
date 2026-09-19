import { PartialPackageData } from "../types.mjs";
//#region src/options/readKeywords.d.ts
declare function readKeywords(getPackageData: () => Promise<PartialPackageData>): Promise<string[] | undefined>;
//#endregion
export { readKeywords };