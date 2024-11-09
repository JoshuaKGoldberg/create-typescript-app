export function sortObject(value: Record<string, unknown>) {
	return Object.fromEntries(
		Object.entries(value).sort(([a], [b]) => a.localeCompare(b)),
	);
}
