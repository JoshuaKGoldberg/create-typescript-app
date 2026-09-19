import { z } from "zod";
//#region src/inputs/inputFromOctokit.d.ts
declare const inputFromOctokit: import("bingo").InputWithArgs<Promise<unknown>, {
  endpoint: z.ZodString;
  options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}>;
//#endregion
export { inputFromOctokit };