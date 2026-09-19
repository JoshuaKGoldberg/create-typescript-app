import { PartialPackageData } from "../types.mjs";
//#region src/options/readPnpm.d.ts
declare function readPnpm(packageData: () => Promise<PartialPackageData>): Promise<string>;
//#endregion
export { readPnpm };