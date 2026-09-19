import { z } from "zod";
import { IntakeDirectory } from "bingo-fs";
//#region src/blocks/actions/steps.d.ts
declare const zActionStep: z.ZodIntersection<z.ZodObject<{
  env: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
  if: z.ZodOptional<z.ZodString>;
  with: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
  with?: Record<string, string> | undefined;
  env?: Record<string, string> | undefined;
  if?: string | undefined;
}, {
  with?: Record<string, string> | undefined;
  env?: Record<string, string> | undefined;
  if?: string | undefined;
}>, z.ZodUnion<[z.ZodObject<{
  run: z.ZodString;
}, "strip", z.ZodTypeAny, {
  run: string;
}, {
  run: string;
}>, z.ZodObject<{
  uses: z.ZodString;
}, "strip", z.ZodTypeAny, {
  uses: string;
}, {
  uses: string;
}>]>>;
interface JobOrRunStep {
  env?: Record<string, string>;
  uses?: unknown;
  with?: Record<string, string>;
}
declare function intakeFileYamlSteps(files: IntakeDirectory, filePath: string[], ymlPath: string[]): JobOrRunStep[] | undefined;
//#endregion
export { JobOrRunStep, intakeFileYamlSteps, zActionStep };