import { z } from "zod";
//#region src/schemas.ts
const zContributor = z.object({
	avatar_url: z.string(),
	contributions: z.array(z.string()),
	login: z.string(),
	name: z.string(),
	profile: z.string()
});
const zReadme = z.object({
	additional: z.string().optional(),
	explainer: z.string().optional(),
	footnotes: z.string().optional(),
	usage: z.string().optional()
});
const zDocumentation = z.object({
	development: z.string().optional(),
	readme: zReadme
});
const zWorkflowVersion = z.object({
	hash: z.string().optional(),
	pinned: z.boolean().optional()
});
const zWorkflowVersions = z.record(zWorkflowVersion);
const zWorkflowsVersions = z.record(zWorkflowVersions);
//#endregion
export { zContributor, zDocumentation, zReadme, zWorkflowVersion, zWorkflowVersions, zWorkflowsVersions };
