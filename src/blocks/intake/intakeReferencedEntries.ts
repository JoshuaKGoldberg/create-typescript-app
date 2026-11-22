import { IntakeDirectory } from "bingo-fs";
import * as path from "node:path";

import { intakeFile } from "./intakeFile.ts";
import { intakeFileAsJson } from "./intakeFileAsJson.ts";

const outputExtension = /\.[cm]?js$/u;
const relativeImport =
	/(?:from|import)\s*(?:\(\s*)?["'](\.{1,2}\/[^"']+)["']/gu;
const sourceExtensions = [".ts", ".tsx", ".mts", ".cts"];

/**
 * Finds the source files for build output that package.json or its bin files
 * reference, such as a `bin/index.js` importing `../lib/cli.js`.
 * The old `src/**\/*.ts` entry built those even when nothing imported them.
 */
export function intakeReferencedEntries(
	files: IntakeDirectory,
	outDir: unknown,
) {
	const packageData = intakeFileAsJson(files, ["package.json"]);
	const outputRoot = path.posix.normalize(
		typeof outDir === "string" ? outDir.replace(/\/$/u, "") : "dist",
	);
	const isInOutput = (filePath: string) =>
		filePath.startsWith(`${outputRoot}/`);

	const bins = collectStrings(packageData?.bin).map(normalize);
	const binImports = bins
		.filter((bin) => !isInOutput(bin))
		.flatMap((bin) =>
			Array.from(
				intakeFile(files, bin.split("/"))?.[0].matchAll(relativeImport) ?? [],
				(match) => path.posix.join(path.posix.dirname(bin), match[1]),
			),
		);

	const outputPaths = [
		...collectStrings([
			packageData?.browser,
			packageData?.exports,
			packageData?.main,
		]).map(normalize),
		...bins,
		...binImports,
	].filter((outputPath) => isInOutput(outputPath));

	return outputPaths
		.filter((outputPath) => outputExtension.test(outputPath))
		.map((outputPath) => {
			const base = `src/${outputPath.slice(outputRoot.length + 1).replace(outputExtension, "")}`;

			return sourceExtensions
				.map((extension) => base + extension)
				.find((candidate) => intakeFile(files, candidate.split("/")));
		})
		.filter((entry) => entry !== undefined);
}

function collectStrings(value: unknown): string[] {
	if (typeof value === "string") {
		return [value];
	}

	return value && typeof value === "object"
		? Object.values(value).flatMap(collectStrings)
		: [];
}

function normalize(filePath: string) {
	return path.posix.normalize(filePath);
}
