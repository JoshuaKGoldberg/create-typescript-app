import { IntakeDirectory } from "bingo-fs";

import { parseDefineConfig } from "../../utils/parseDefineConfig.ts";
import { intakeFile } from "./intakeFile.ts";

export function intakeFileDefineConfig(
	files: IntakeDirectory,
	filePath: (string | string[])[],
): Record<string, unknown> | undefined {
	const file = intakeFile(files, filePath);

	return file && parseDefineConfig(file[0]);
}
