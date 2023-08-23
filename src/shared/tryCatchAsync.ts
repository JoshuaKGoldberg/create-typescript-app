export async function tryCatchAsync<T>(get: () => Promise<T>) {
	try {
		return await get();
	} catch {
		return undefined;
	}
}
