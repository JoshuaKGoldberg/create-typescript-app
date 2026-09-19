//#region src/options/readFileSafe.d.ts
declare function readFileSafe(filePath: string | URL, fallback: string): Promise<string>;
//#endregion
export { readFileSafe };