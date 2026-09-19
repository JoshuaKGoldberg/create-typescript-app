import { WorkflowsVersions } from "../../schemas.mjs";
//#region src/blocks/actions/resolveUses.d.ts
declare function resolveUses(action: string, version: string, workflowsVersions?: WorkflowsVersions): string;
//#endregion
export { resolveUses };