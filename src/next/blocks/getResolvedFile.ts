export function getResolvedFile(packageName: string) {
	return import.meta
		.resolve(packageName, import.meta.dirname)
		.replace(/^file:\/\//, "");
}
