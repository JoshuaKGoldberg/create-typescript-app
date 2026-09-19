//#region src/utils/tryCatch.d.ts
declare function tryCatch<T>(task: () => T | undefined): T | undefined;
//#endregion
export { tryCatch };