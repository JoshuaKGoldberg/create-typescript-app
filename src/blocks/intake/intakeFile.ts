import { IntakeDirectory, IntakeFileEntry } from "bingo-fs";

export function intakeFile(
	files: IntakeDirectory,
	filePath: string[],
): IntakeFileEntry | undefined {
	if (!filePath.length) {
		return undefined;
	}

	const entry = files[filePath[0]];

	if (filePath.length === 1) {
		return Array.isArray(entry) ? entry : undefined;
	}

	return typeof entry === "object" && !Array.isArray(entry)
		? intakeFile(entry, filePath.slice(1))
		: undefined;
}
