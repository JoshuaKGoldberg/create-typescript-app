//#region src/options/readEmoji.d.ts
declare function readEmoji(getDescription: () => Promise<string | undefined>): Promise<string>;
//#endregion
export { readEmoji };