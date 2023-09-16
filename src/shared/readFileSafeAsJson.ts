import { readFileSafe } from "./readFileSafe.js";

export async function readFileSafeAsJson(filePath: string | URL) {
	return JSON.parse(await readFileSafe(filePath, "null")) as unknown;
}
