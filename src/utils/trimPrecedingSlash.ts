export function trimPrecedingSlash(filePath: string | undefined) {
	return filePath?.replace(/^\.\//, "");
}
