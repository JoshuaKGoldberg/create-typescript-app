import { z } from "zod";

export const optionsSchema = z.object({
	author: z.string().optional(),
	base: z
		.union([z.literal("everything"), z.literal("minimum"), z.literal("prompt")])
		.optional(),
	createRepository: z.boolean().optional(),
	description: z.string(),
	email: z.string().email().optional(),
	excludeCompliance: z.boolean().optional(),
	excludeContributors: z.boolean().optional(),
	excludeLintJson: z.boolean().optional(),
	excludeLintKnip: z.boolean().optional(),
	excludeLintMd: z.boolean().optional(),
	excludeLintPackageJson: z.boolean().optional(),
	excludeLintPackages: z.boolean().optional(),
	excludeLintPerfectionist: z.boolean().optional(),
	excludeLintSpelling: z.boolean().optional(),
	excludeLintYml: z.boolean().optional(),
	excludeReleases: z.boolean().optional(),
	excludeRenovate: z.boolean().optional(),
	excludeTests: z.boolean().optional(),
	funding: z.string().optional(),
	owner: z.string(),
	repository: z.string(),
	skipGitHubApi: z.boolean(),
	skipInstall: z.boolean().optional(),
	skipRemoval: z.boolean().optional(),
	skipRestore: z.boolean().optional(),
	skipUninstall: z.boolean().optional(),
	title: z.string(),
});
