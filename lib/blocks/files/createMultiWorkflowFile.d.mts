import { WorkflowsVersions } from "../../schemas.mjs";
//#region src/blocks/files/createMultiWorkflowFile.d.ts
interface MultiWorkflowFileOptions {
  jobs: MultiWorkflowJobOptions[];
  name: string;
  workflowsVersions: undefined | WorkflowsVersions;
}
interface MultiWorkflowJobOptions {
  checkoutWith?: Record<string, string>;
  if?: string;
  name: string;
  steps: MultiWorkflowJobStep[];
}
type MultiWorkflowJobStep = {
  if?: string;
} & ({
  run: string;
} | {
  uses: string;
  with?: Record<string, string>;
});
declare function createMultiWorkflowFile({ jobs, name, workflowsVersions }: MultiWorkflowFileOptions): string;
//#endregion
export { MultiWorkflowFileOptions, MultiWorkflowJobOptions, MultiWorkflowJobStep, createMultiWorkflowFile };