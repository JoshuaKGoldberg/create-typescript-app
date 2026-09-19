//#region src/blocks/files/createSoloWorkflowFile.d.ts
interface WorkflowFileConcurrency {
  "cancel-in-progress"?: boolean;
  group: string;
}
interface WorkflowFileOn {
  discussion?: {
    types?: string[];
  };
  discussion_comment?: {
    types?: string[];
  };
  issue_comment?: {
    types?: string[];
  };
  issues?: {
    types?: string[];
  };
  pull_request?: null | string | {
    branches?: string | string[];
    types?: string[];
  };
  pull_request_review_comment?: {
    types: string[];
  };
  pull_request_target?: {
    types: string[];
  };
  push?: {
    branches: string[];
  };
  release?: {
    types: string[];
  };
  workflow_dispatch?: null | string;
}
interface WorkflowFileOptions {
  concurrency?: WorkflowFileConcurrency;
  if?: string;
  jobName?: string;
  name: string;
  on?: WorkflowFileOn;
  permissions?: WorkflowFilePermissions;
  steps: WorkflowFileStep[];
}
interface WorkflowFilePermissions {
  contents?: string;
  discussions?: string;
  "id-token"?: string;
  issues?: string;
  "pull-requests"?: string;
}
interface WorkflowFileStep {
  env?: Record<string, string>;
  id?: string;
  if?: string;
  name?: string;
  run?: string;
  uses?: string;
  with?: Record<string, unknown>;
}
declare function createSoloWorkflowFile({ concurrency, jobName, name, on, permissions, ...options }: WorkflowFileOptions): string;
//#endregion
export { createSoloWorkflowFile };