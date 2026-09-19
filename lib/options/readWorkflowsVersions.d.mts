import { WorkflowsVersions } from "../schemas.mjs";
import { TakeInput } from "bingo";
//#region src/options/readWorkflowsVersions.d.ts
declare function readWorkflowsVersions(take: TakeInput): Promise<WorkflowsVersions>;
//#endregion
export { readWorkflowsVersions };