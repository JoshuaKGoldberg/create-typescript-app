import { IntakeDirectory } from "bingo-fs";
import JSON5 from "json5";

import { intakeFile } from "./intakeFile.js";

export function intakeFileAsJson(files: IntakeDirectory, filePath: string[]) {
	const file = intakeFile(files, filePath);

	try {
		return file && JSON5.parse<Record<string, unknown> | undefined>(file[0]);
	} catch {
		return undefined;
	}
}
