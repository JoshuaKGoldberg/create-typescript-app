import { Documentation } from "../schemas.mjs";
//#region src/options/readDocumentation.d.ts
declare function readDocumentation(getDevelopmentDocumentation: () => Promise<string | undefined>, getReadmeAdditional: () => Promise<string | undefined>, getReadmeExplainer: () => Promise<string | undefined>, getReadmeFootnotes: () => Promise<string | undefined>, getReadmeUsage: () => Promise<string | undefined>): Promise<Documentation>;
//#endregion
export { readDocumentation };