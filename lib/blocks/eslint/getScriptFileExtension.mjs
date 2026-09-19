//#region src/blocks/eslint/getScriptFileExtension.ts
function getScriptFileExtension(options) {
	return options.type === "commonjs" ? "**/*.{js,mjs,ts}" : "**/*.{js,ts}";
}
//#endregion
export { getScriptFileExtension };
