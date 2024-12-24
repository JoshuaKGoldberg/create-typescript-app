import { Options } from "../shared/types.js";

export function createRerunDirectorySuggestion(options: Partial<Options>) {
	const defaultValue = options.mode === "create" ? options.repository : ".";

	return options.directory === defaultValue ? undefined : options.directory;
}
