export async function swallowErrorAsync<T>(task: Promise<T>) {
	try {
		return await task;
	} catch {
		return undefined;
	}
}
