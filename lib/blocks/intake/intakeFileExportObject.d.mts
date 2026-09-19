import { IntakeDirectory } from "bingo-fs";
//#region src/blocks/intake/intakeFileExportObject.d.ts
declare function intakeFileExportObject(files: IntakeDirectory, filePath: (string | string[])[]): Record<string, unknown> | undefined;
//#endregion
export { intakeFileExportObject };