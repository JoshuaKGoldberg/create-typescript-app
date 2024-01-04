import { Options } from "../../../shared/types.js";
import { formatIgnoreFile } from "./formatters/formatIgnoreFile.js";

export function createDotGitignore(options: Pick<Options, "excludeTests">) {
	return formatIgnoreFile([
		...(options.excludeTests ? [] : ["coverage/"]),
		"lib/",
		"node_modules/",
	]);
}
