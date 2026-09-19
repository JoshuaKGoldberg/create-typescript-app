//#region src/options/readReadmeUsage.d.ts
declare function readReadmeUsage(getReadme: () => Promise<string>): Promise<string | undefined>;
//#endregion
export { readReadmeUsage };