export async function optionalDefault<T extends boolean | number | string>(
	value: T | undefined,
	getDefault: T | (() => Promise<T | undefined>) | undefined
) {
	if (value !== undefined) {
		return value;
	}

	if (typeof getDefault === "function") {
		return await getDefault();
	}

	return getDefault;
}
