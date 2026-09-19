import { IntakeDirectory } from "bingo-fs";
//#region src/blocks/intake/intakeFileDefineConfig.d.ts
declare function intakeFileDefineConfig(files: IntakeDirectory, filePath: (string | string[])[]): Record<string, unknown> | undefined;
//#endregion
export { intakeFileDefineConfig };