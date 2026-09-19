//#region src/blocks/eslint/blockESLintIntake.d.ts
declare function blockESLintIntake(sourceText: string): {
  ignores: (string | (RegExp & string))[];
  rules: {
    entries: Record<string, "off" | "error" | "warn" | ["error" | "warn", unknown] | ["error" | "warn", unknown, unknown]>;
    comment?: string | undefined;
  }[];
} | undefined;
//#endregion
export { blockESLintIntake };