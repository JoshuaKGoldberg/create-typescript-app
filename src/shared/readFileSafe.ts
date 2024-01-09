import * as fs from "node:fs/promises";

export async function readFileSafe(filePath: URL | string, fallback: string) {
	try {
		return (await fs.readFile(filePath)).toString();
	} catch {
		return fallback;
	}
}
