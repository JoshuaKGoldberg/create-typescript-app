// TODO: move to npm package?
export function sortObject(value: object | Record<string, unknown>) {
	return Object.fromEntries(
		Object.entries(value).sort(([a], [b]) => a.localeCompare(b)),
	);
}
