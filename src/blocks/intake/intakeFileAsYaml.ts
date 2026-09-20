import { IntakeDirectory } from "bingo-fs";
import { load } from "js-yaml";

import { intakeFile } from "./intakeFile.ts";

export function intakeFileAsYaml(files: IntakeDirectory, filePath: string[]) {
	const file =
		intakeFile(files, filePath) ??
		intakeFile(files, [
			...filePath.slice(0, filePath.length - 1),
			filePath[filePath.length - 1].replace(/\.yaml$/i, ".yml"),
		]);

	return file && loadYamlSafe(file[0]);
}

export function loadYamlSafe(contents: string) {
	try {
		return load(contents);
	} catch {
		return undefined;
	}
}
