//#region src/options/readReadmeExplainer.d.ts
declare function readReadmeExplainer(getReadme: () => Promise<string>): Promise<string | undefined>;
//#endregion
export { readReadmeExplainer };