import { trimPrecedingSlash } from "../../utils/trimPrecedingSlash.ts";

export function getPrimaryBin(
	bin: Record<string, string | undefined> | string | undefined,
	repository: string | undefined,
) {
	if (typeof bin !== "object") {
		return trimPrecedingSlash(bin);
	}

	return repository === undefined
		? undefined
		: trimPrecedingSlash(bin[repository] ?? bin[repository.toLowerCase()]);
}
