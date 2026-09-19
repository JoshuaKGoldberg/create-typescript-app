//#region src/utils/swallowError.d.ts
declare function swallowError<T>(value: Error | T): T | undefined;
//#endregion
export { swallowError };