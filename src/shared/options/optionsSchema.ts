import { z } from "zod";

export const optionsSchemaShape = {
	access: z.union([z.literal("public"), z.literal("restricted")]).optional(),
	author: z.string().optional(),
	base: z
		.union([
			z.literal("common"),
			z.literal("everything"),
			z.literal("minimum"),
			z.literal("prompt"),
		])
		.optional(),
	createRepository: z.boolean().optional(),
	description: z.string().optional(),
	email: z
		.object({
			github: z.string().email(),
			npm: z.string().email(),
		})
		.optional(),
	excludeCompliance: z.boolean().optional(),
	excludeContributors: z.boolean().optional(),
	excludeLintDeprecation: z.boolean().optional(),
	excludeLintESLint: z.boolean().optional(),
	excludeLintJSDoc: z.boolean().optional(),
	excludeLintJson: z.boolean().optional(),
	excludeLintKnip: z.boolean().optional(),
	excludeLintMd: z.boolean().optional(),
	excludeLintPackageJson: z.boolean().optional(),
	excludeLintPackages: z.boolean().optional(),
	excludeLintPerfectionist: z.boolean().optional(),
	excludeLintRegex: z.boolean().optional(),
	excludeLintSpelling: z.boolean().optional(),
	excludeLintStrict: z.boolean().optional(),
	excludeLintStylistic: z.boolean().optional(),
	excludeLintYml: z.boolean().optional(),
	excludeReleases: z.boolean().optional(),
	excludeRenovate: z.boolean().optional(),
	excludeTests: z.boolean().optional(),
	funding: z.string().optional(),
	logo: z.string().optional(),
	logoAlt: z.string().optional(),
	mode: z
		.union([z.literal("create"), z.literal("initialize"), z.literal("migrate")])
		.optional(),
	owner: z.string().optional(),
	repository: z.string().optional(),
	skipGitHubApi: z.boolean().optional(),
	skipInstall: z.boolean().optional(),
	skipRemoval: z.boolean().optional(),
	skipRestore: z.boolean().optional(),
	skipUninstall: z.boolean().optional(),
	title: z.string().optional(),
};

export const optionsSchema = z.object(optionsSchemaShape);
