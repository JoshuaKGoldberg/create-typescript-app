import { IntakeDirectory } from "bingo-fs";
import JSON5 from "json5";

import { intakeFile } from "./intakeFile.js";

export function intakeFileDefineConfig(
	files: IntakeDirectory,
	filePath: (string | string[])[],
): Record<string, unknown> | undefined {
	const file = intakeFile(files, filePath);
	if (!file) {
		return undefined;
	}

	const normalized = file[0].replaceAll(/[\n\r]/g, "");
	const matched = /defineConfig\(\{(.+)\}\)\s*(?:;\s*)?$/u.exec(normalized);
	if (!matched) {
		return undefined;
	}

	const rawData = tryParseJSON5(`{${matched[1]}}`);
	if (!rawData || typeof rawData !== "object") {
		return undefined;
	}

	return rawData;
}

function tryParseJSON5(text: string) {
	try {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
		return JSON5.parse(text) as Record<string, unknown> | undefined;
	} catch {
		return undefined;
	}
}
