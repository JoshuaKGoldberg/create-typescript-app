//#region src/utils/tryCatch.ts
function tryCatch(task) {
	try {
		return task();
	} catch {
		return;
	}
}
//#endregion
export { tryCatch };
