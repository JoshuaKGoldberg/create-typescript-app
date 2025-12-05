import { IntakeDirectory } from "bingo-fs";
import jsYaml from "js-yaml";

import { intakeFile } from "./intakeFile.js";

export function intakeFileAsYaml(files: IntakeDirectory, filePath: string[]) {
	const file =
		intakeFile(files, filePath) ??
		intakeFile(files, [
			...filePath.slice(0, filePath.length - 1),
			filePath[filePath.length - 1].replace(/\.yaml$/i, ".yml"),
		]);

	try {
		return file && jsYaml.load(file[0]);
	} catch {
		return undefined;
	}
}
