//#region src/options/readReadmeAdditional.d.ts
declare function readReadmeAdditional(getReadme: () => Promise<string>): Promise<string | undefined>;
//#endregion
export { readReadmeAdditional };