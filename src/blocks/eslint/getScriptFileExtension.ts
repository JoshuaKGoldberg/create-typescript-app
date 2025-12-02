export interface ScriptFileExtensionOptions {
	type?: "commonjs" | "module";
}

export function getScriptFileExtension(options: ScriptFileExtensionOptions) {
	return options.type === "commonjs" ? "**/*.{js,mjs,ts}" : "**/*.{js,ts}";
}
