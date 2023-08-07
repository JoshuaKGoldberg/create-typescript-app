import { readFileSafe } from "./readFileSafe.js";

export async function readFileSafeAsJson(filePath: string) {
	return JSON.parse(await readFileSafe(filePath, "null")) as unknown;
}
