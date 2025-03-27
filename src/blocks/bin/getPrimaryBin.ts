export function getPrimaryBin(
	bin: Record<string, string | undefined> | string | undefined,
	repository: string,
) {
	return typeof bin === "object" ? bin[repository] : bin;
}
