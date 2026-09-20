import JSON5 from "json5";

/**
 * Parses the object literal passed to `defineConfig(...)` in a config file.
 */
export function parseDefineConfig(
	contents: string,
): Record<string, unknown> | undefined {
	const normalized = contents.replaceAll(/[\n\r]/g, "");
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
