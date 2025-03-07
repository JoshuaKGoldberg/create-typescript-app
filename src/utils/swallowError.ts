export function swallowError<T>(value: Error | T) {
	return value instanceof Error ? undefined : value;
}
