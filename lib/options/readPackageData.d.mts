import { PartialPackageData } from "../types.mjs";
import { TakeInput } from "bingo";
//#region src/options/readPackageData.d.ts
declare function readPackageData(take: TakeInput): Promise<PartialPackageData>;
//#endregion
export { readPackageData };