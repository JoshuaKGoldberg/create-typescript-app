export function isPlainObject(
	value: unknown,
): value is Record<string, unknown> {
	return !!value && typeof value === "object" && !Array.isArray(value);
}
