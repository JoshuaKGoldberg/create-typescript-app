export function removeUsesQuotes(original: string) {
	return original.replaceAll(/ uses: '.+'/gu, (line) =>
		line.replaceAll("'", ""),
	);
}
