//#region src/options/readTitle.d.ts
declare function readTitle(getReadme: () => Promise<string>, getRepository: () => Promise<string | undefined>): Promise<string | undefined>;
//#endregion
export { readTitle };