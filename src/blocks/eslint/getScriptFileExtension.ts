export interface ScriptFileExtensionOptions {
	type?: "commonjs" | "module";
}

export function getScriptFileExtension(
	options: ScriptFileExtensionOptions,
	additionalExtensions: string[] = [],
) {
	const extensions = [
		...(options.type === "commonjs" ? ["js", "mjs", "ts"] : ["js", "ts"]),
		...additionalExtensions,
	];

	return `**/*.{${extensions.join(",")}}`;
}
