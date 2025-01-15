// TODO: What to do about errors? I think this is correct, but ...?
export function swallowError<T>(value: Error | T) {
	return value instanceof Error ? undefined : value;
}
