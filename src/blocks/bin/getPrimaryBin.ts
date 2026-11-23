export function getPrimaryBin(
	bin: Record<string, string | undefined> | string | undefined,
	repository: string | undefined,
) {
	if (typeof bin !== "object") {
		return bin;
	}

	return repository === undefined
		? undefined
		: (bin[repository] ?? bin[repository.toLowerCase()]);
}
