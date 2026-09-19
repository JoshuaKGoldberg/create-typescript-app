import { Extension } from "./schemas.mjs";
//#region src/blocks/eslint/mergeAllExtensions.d.ts
declare function mergeAllExtensions(...extensions: Extension[]): {
  files: string[];
  extends?: string[] | undefined;
  languageOptions?: unknown;
  linterOptions?: unknown;
  plugins?: Record<string, string> | undefined;
  rules?: Record<string, "off" | "error" | "warn" | ["error" | "warn", unknown] | ["error" | "warn", unknown, unknown]> | {
    entries: Record<string, "off" | "error" | "warn" | ["error" | "warn", unknown] | ["error" | "warn", unknown, unknown]>;
    comment?: string | undefined;
  }[] | undefined;
  settings?: Record<string, unknown> | undefined;
}[];
//#endregion
export { mergeAllExtensions };