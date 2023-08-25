export async function optionalDefault<T extends boolean | number | string>(
	value: T | undefined,
	getDefault?: (() => Promise<T | undefined>) | T | undefined,
) {
	if (value !== undefined) {
		return value;
	}

	if (typeof getDefault === "function") {
		return await getDefault();
	}

	return getDefault;
}
