import fs from "node:fs/promises";

export async function readFileSafe(filePath: string, fallback: string) {
	try {
		return (await fs.readFile(filePath)).toString();
	} catch {
		return fallback;
	}
}
