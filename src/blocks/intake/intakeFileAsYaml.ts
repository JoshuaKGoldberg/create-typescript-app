import { IntakeDirectory } from "bingo-fs";
import { load } from "js-yaml";

import { intakeFile } from "./intakeFile.ts";

export function intakeFileAsYaml(files: IntakeDirectory, filePath: string[]) {
	const [fileName] = filePath.slice(-1);
	const file =
		intakeFile(files, filePath) ??
		intakeFile(files, [
			...filePath.slice(0, -1),
			fileName.replace(/\.yaml$/i, ".yml"),
		]);

	return file && loadYamlSafe(file[0]);
}

export function loadYamlSafe(contents: string) {
	try {
		return load(contents);
	} catch {
		return;
	}
}
