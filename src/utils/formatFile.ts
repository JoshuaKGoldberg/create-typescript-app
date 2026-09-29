import prettier from "@prettier/sync";

export function formatFile(filePath: string, text: string) {
	return prettier.format(text, { filepath: filePath, useTabs: true });
}
