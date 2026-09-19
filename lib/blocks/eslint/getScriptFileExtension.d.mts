//#region src/blocks/eslint/getScriptFileExtension.d.ts
interface ScriptFileExtensionOptions {
  type?: "commonjs" | "module";
}
declare function getScriptFileExtension(options: ScriptFileExtensionOptions): "**/*.{js,mjs,ts}" | "**/*.{js,ts}";
//#endregion
export { ScriptFileExtensionOptions, getScriptFileExtension };