import { promises as fs } from "fs";

export async function readFileAsJSON(filePath: string) {
	try {
		return JSON.parse((await fs.readFile(filePath)).toString()) as unknown;
	} catch (error) {
		throw new Error(
			`Could not read file from ${filePath} as JSON. Please ensure the file exists and is valid JSON.`,
			{ cause: error }
		);
	}
}
