import { PartialPackageData } from "../types.mjs";
//#region src/options/readDescription.d.ts
declare function readDescription(getPackageData: () => Promise<PartialPackageData>, getReadme: () => Promise<string>, getRepository: () => Promise<string | undefined>): Promise<string | undefined>;
//#endregion
export { readDescription };