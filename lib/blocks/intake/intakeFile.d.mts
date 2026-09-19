import { IntakeDirectory, IntakeFileEntry } from "bingo-fs";
//#region src/blocks/intake/intakeFile.d.ts
declare function intakeFile(files: IntakeDirectory, filePath: (string | string[])[]): IntakeFileEntry | undefined;
//#endregion
export { intakeFile };