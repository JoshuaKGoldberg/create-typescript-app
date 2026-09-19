//#region src/utils/swallowErrorAsync.d.ts
declare function swallowErrorAsync<T>(task: Promise<T>): Promise<T | undefined>;
//#endregion
export { swallowErrorAsync };