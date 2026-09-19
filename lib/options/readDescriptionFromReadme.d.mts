//#region src/options/readDescriptionFromReadme.d.ts
declare function readDescriptionFromReadme(getReadme: () => Promise<string>): Promise<string | undefined>;
//#endregion
export { readDescriptionFromReadme };