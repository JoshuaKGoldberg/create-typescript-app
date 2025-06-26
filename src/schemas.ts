import { z } from "zod";

export const zContributor = z.object({
	avatar_url: z.string(),
	contributions: z.array(z.string()),
	login: z.string(),
	name: z.string(),
	profile: z.string(),
});

export type Contributor = z.infer<typeof zContributor>;

export const zReadme = z.object({
	additional: z.string().optional(),
	explainer: z.string().optional(),
	footnotes: z.string().optional(),
	usage: z.string().optional(),
});

export type Readme = z.infer<typeof zReadme>;

export const zDocumentation = z.object({
	development: z.string().optional(),
	readme: zReadme,
});

export type Documentation = z.infer<typeof zDocumentation>;

export const zWorkflowVersion = z.object({
	hash: z.string().optional(),
	pinned: z.boolean().optional(),
});

export type WorkflowVersion = z.infer<typeof zWorkflowVersion>;

export const zWorkflowVersions = z.record(zWorkflowVersion);

export type WorkflowVersions = z.infer<typeof zWorkflowVersions>;

export const zWorkflowsVersions = z.record(zWorkflowVersions);

export type WorkflowsVersions = z.infer<typeof zWorkflowsVersions>;
