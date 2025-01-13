export function formatIgnoreFile(lines: (string | undefined)[]) {
	return [...lines.filter(Boolean), ""].join("\n");
}
