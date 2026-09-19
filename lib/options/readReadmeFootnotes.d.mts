//#region src/options/readReadmeFootnotes.d.ts
declare const indicatorsTemplatedBy: RegExp[];
declare function readReadmeFootnotes(getReadme: () => Promise<string>): Promise<string | undefined>;
//#endregion
export { indicatorsTemplatedBy, readReadmeFootnotes };