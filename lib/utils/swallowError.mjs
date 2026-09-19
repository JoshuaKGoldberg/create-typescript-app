//#region src/utils/swallowError.ts
function swallowError(value) {
	return value instanceof Error ? void 0 : value;
}
//#endregion
export { swallowError };
