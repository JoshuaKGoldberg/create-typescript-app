import { TakeInput } from "bingo";
//#region src/options/readWords.d.ts
declare function readWords(take: TakeInput): Promise<string[] | undefined>;
//#endregion
export { readWords };