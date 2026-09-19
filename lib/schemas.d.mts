import { z } from "zod";
//#region src/schemas.d.ts
declare const zContributor: z.ZodObject<{
  avatar_url: z.ZodString;
  contributions: z.ZodArray<z.ZodString, "many">;
  login: z.ZodString;
  name: z.ZodString;
  profile: z.ZodString;
}, "strip", z.ZodTypeAny, {
  avatar_url: string;
  contributions: string[];
  login: string;
  name: string;
  profile: string;
}, {
  avatar_url: string;
  contributions: string[];
  login: string;
  name: string;
  profile: string;
}>;
type Contributor = z.infer<typeof zContributor>;
declare const zReadme: z.ZodObject<{
  additional: z.ZodOptional<z.ZodString>;
  explainer: z.ZodOptional<z.ZodString>;
  footnotes: z.ZodOptional<z.ZodString>;
  usage: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
  additional?: string | undefined;
  explainer?: string | undefined;
  footnotes?: string | undefined;
  usage?: string | undefined;
}, {
  additional?: string | undefined;
  explainer?: string | undefined;
  footnotes?: string | undefined;
  usage?: string | undefined;
}>;
type Readme = z.infer<typeof zReadme>;
declare const zDocumentation: z.ZodObject<{
  development: z.ZodOptional<z.ZodString>;
  readme: z.ZodObject<{
    additional: z.ZodOptional<z.ZodString>;
    explainer: z.ZodOptional<z.ZodString>;
    footnotes: z.ZodOptional<z.ZodString>;
    usage: z.ZodOptional<z.ZodString>;
  }, "strip", z.ZodTypeAny, {
    additional?: string | undefined;
    explainer?: string | undefined;
    footnotes?: string | undefined;
    usage?: string | undefined;
  }, {
    additional?: string | undefined;
    explainer?: string | undefined;
    footnotes?: string | undefined;
    usage?: string | undefined;
  }>;
}, "strip", z.ZodTypeAny, {
  readme: {
    additional?: string | undefined;
    explainer?: string | undefined;
    footnotes?: string | undefined;
    usage?: string | undefined;
  };
  development?: string | undefined;
}, {
  readme: {
    additional?: string | undefined;
    explainer?: string | undefined;
    footnotes?: string | undefined;
    usage?: string | undefined;
  };
  development?: string | undefined;
}>;
type Documentation = z.infer<typeof zDocumentation>;
declare const zWorkflowVersion: z.ZodObject<{
  hash: z.ZodOptional<z.ZodString>;
  pinned: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
  pinned?: boolean | undefined;
  hash?: string | undefined;
}, {
  pinned?: boolean | undefined;
  hash?: string | undefined;
}>;
type WorkflowVersion = z.infer<typeof zWorkflowVersion>;
declare const zWorkflowVersions: z.ZodRecord<z.ZodString, z.ZodObject<{
  hash: z.ZodOptional<z.ZodString>;
  pinned: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
  pinned?: boolean | undefined;
  hash?: string | undefined;
}, {
  pinned?: boolean | undefined;
  hash?: string | undefined;
}>>;
type WorkflowVersions = z.infer<typeof zWorkflowVersions>;
declare const zWorkflowsVersions: z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodObject<{
  hash: z.ZodOptional<z.ZodString>;
  pinned: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
  pinned?: boolean | undefined;
  hash?: string | undefined;
}, {
  pinned?: boolean | undefined;
  hash?: string | undefined;
}>>>;
type WorkflowsVersions = z.infer<typeof zWorkflowsVersions>;
//#endregion
export { Contributor, Documentation, Readme, WorkflowVersion, WorkflowVersions, WorkflowsVersions, zContributor, zDocumentation, zReadme, zWorkflowVersion, zWorkflowVersions, zWorkflowsVersions };