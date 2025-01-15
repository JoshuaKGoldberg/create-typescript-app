export function resolveBin(bin: string) {
	return import.meta.resolve(bin).replace(/^file:\/\//gu, "");
}
