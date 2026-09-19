import { PartialPackageData } from "../types.mjs";
//#region src/options/readAccess.d.ts
declare function readAccess(getPackageDataFull: () => Promise<PartialPackageData | undefined>): Promise<"public" | "restricted">;
//#endregion
export { readAccess };