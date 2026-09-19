import { PartialPackageData } from "../types.mjs";
//#region src/options/readNode.d.ts
declare function readNode(getNvmrc: () => Promise<Error | string>, getPackageDataFull: () => Promise<PartialPackageData>): Promise<{
  minimum: string;
  pinned: string;
}>;
//#endregion
export { readNode };