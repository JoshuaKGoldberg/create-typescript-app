import { IntakeDirectory } from "bingo-fs";

import { intakeFileAsJson } from "./intakeFileAsJson.ts";
import { intakeFileDefineConfig } from "./intakeFileDefineConfig.ts";

export function intakeFileTSDown(
	files: IntakeDirectory,
): Record<string, unknown> | undefined {
	const rawData =
		intakeFileDefineConfig(files, [
			["tsdown.config.ts", "tsdown.config.mts"],
		]) ?? intakeFileDefineConfig(files, ["tsup.config.ts"]);

	return (
		rawData && {
			...rawData,
			fixedExtension:
				rawData.fixedExtension ??
				(isEsmOnly(rawData.format) && hasJsEntryPoint(files)
					? false
					: undefined),
		}
	);
}

function hasJsEntryPoint(files: IntakeDirectory) {
	const packageData = intakeFileAsJson(files, ["package.json"]);
	const exports = packageData?.exports;
	const entryPoint =
		typeof exports === "string"
			? exports
			: ((exports as Record<string, unknown> | undefined)?.["."] ??
				packageData?.main);

	return typeof entryPoint === "string"
		? entryPoint.endsWith(".js")
		: entryPoint === undefined;
}

function isEsmOnly(format: unknown) {
	return format === undefined || format === "esm";
}
