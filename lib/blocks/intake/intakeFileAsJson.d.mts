import { IntakeDirectory } from "bingo-fs";
//#region src/blocks/intake/intakeFileAsJson.d.ts
declare function intakeFileAsJson(files: IntakeDirectory, filePath: string[]): Record<string, unknown> | undefined;
//#endregion
export { intakeFileAsJson };