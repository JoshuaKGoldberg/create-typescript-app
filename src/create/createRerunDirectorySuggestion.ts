import { Options } from "../shared/types.js";

export function createRerunDirectorySuggestion(options: Partial<Options>) {
	if (!options.directory) {
		return undefined;
	}

	const defaultValue = options.mode === "create" ? options.repository : ".";

	return options.directory === defaultValue ? undefined : options.directory;
}
