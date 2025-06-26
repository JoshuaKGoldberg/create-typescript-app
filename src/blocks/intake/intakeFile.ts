import { IntakeDirectory, IntakeFileEntry } from "bingo-fs";

export function intakeFile(
	files: IntakeDirectory,
	filePath: (string | string[])[],
): IntakeFileEntry | undefined {
	if (!filePath.length) {
		return undefined;
	}

	const nextPathCandidates =
		typeof filePath[0] === "string" ? [filePath[0]] : filePath[0];
	const nextFilePath = nextPathCandidates.find(
		(candidate) => candidate in files,
	);
	if (!nextFilePath) {
		return undefined;
	}

	const entry = files[nextFilePath];

	if (filePath.length === 1) {
		return Array.isArray(entry) ? entry : undefined;
	}

	return typeof entry === "object" && !Array.isArray(entry)
		? intakeFile(entry, filePath.slice(1))
		: undefined;
}
