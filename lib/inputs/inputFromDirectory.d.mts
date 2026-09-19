import { z } from "zod";
//#region src/inputs/inputFromDirectory.d.ts
declare const inputFromDirectory: import("bingo").InputWithArgs<Promise<string[]>, {
  directoryPath: z.ZodString;
}>;
//#endregion
export { inputFromDirectory };