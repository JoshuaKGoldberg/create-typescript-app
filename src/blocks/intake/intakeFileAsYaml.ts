import { IntakeDirectory } from "bingo-fs";
import jsYaml from "js-yaml";

import { intakeFile } from "./intakeFile.js";

export function intakeFileAsYaml(files: IntakeDirectory, filePath: string) {
	const file = intakeFile(files, filePath.split("/"));

	return file && jsYaml.load(file[0]);
}
