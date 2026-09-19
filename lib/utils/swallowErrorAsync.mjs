//#region src/utils/swallowErrorAsync.ts
async function swallowErrorAsync(task) {
	try {
		return await task;
	} catch {
		return;
	}
}
//#endregion
export { swallowErrorAsync };
