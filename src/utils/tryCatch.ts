export function tryCatch<T>(task: () => T | undefined) {
	try {
		return task();
	} catch {
		return undefined;
	}
}
